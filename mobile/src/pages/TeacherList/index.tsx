import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RectButton, TextInput, BorderlessButton, State } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                });
                
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFilterVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
           <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton
                        onPress={handleToggleFiltersVisible}
                    >
                        <Feather name="filter" size={28} color="#fff" />
                    </BorderlessButton>
                )}
            >
               { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                                style={styles.input}
                                value={subject}
                                onChangeText={text => setSubject(text)}
                                placeholder="Qual a matéria?"
                                placeholderTextColor="#c1bccc"
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        placeholder="Qual o dia?"
                                        placeholderTextColor="#c1bccc"
                                    />
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        placeholder="Qual a hora?"
                                        placeholderTextColor="#c1bccc"
                                    />
                                </View>
                            </View>

                            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>
                    </View>
               )}
               
           </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            favorited={favorites.includes(teacher.id) }
                            day={week_day}
                            key={teacher.id}
                            teacher={teacher}
                        />
                    );   
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;