import {View, Text, Button, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SettingsStackParams} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getCompanies, getDBConnection} from '../services/database';
import CompanyIdCard from '../components/CompanyIdCard';

type Props = NativeStackScreenProps<SettingsStackParams, 'SetCompanyId'>;

export default function SetCompIDScreen({navigation}: Props) {
  const [companies, setCompanies] = useState<
    {id: number; company_id: string}[]
  >([]);

  const loadCompanies = async (): Promise<void> => {
    const db = await getDBConnection();
    const list = await getCompanies(db);
    setCompanies(list);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <View>
      <Text>SetCompIDScreen</Text>
      <Button
        title="Enter company Id"
        onPress={() =>
          navigation.navigate('EnterCompanyId', {fromSettings: true})
        }
      />
      {companies.length === 0 ? (
        <Text>No companies to show</Text>
      ) : (
        <>
          <Text>Saved Companies IDs</Text>
          <FlatList
            data={companies}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <CompanyIdCard
                id={item.id}
                company_id={item.company_id}
                loadCompanies={loadCompanies}
              />
            )}
          />
        </>
      )}
    </View>
  );
}
