import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SettingsStackParams} from '../types/types';
import {getCompanies, getDBConnection} from '../services/database';
import CompanyIdCard from '../components/CompanyIdCard';
import GradientCircles from '../components/GradientCircles';
import GradientButton from '../components/GradientButton';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<SettingsStackParams, 'SetCompanyId'>;

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
    <View style={styles.container}>
      <GradientCircles />
      <View style={styles.content}>
        <Text style={styles.title}>Manage Company IDs</Text>
        <View style={styles.buttonContainer}>
          <GradientButton
            text="Enter company Id"
            onpress={() =>
              navigation.navigate('EnterCompanyId', {
                fromSettings: true,
              })
            }
          />
        </View>

        {companies.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No companies added yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the button above to add your first company ID
            </Text>
          </View>
        ) : (
          <BottomSheetFlatList
            data={companies}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={() => (
              <Text style={styles.sectionTitle}>Saved Companies IDs</Text>
            )}
            renderItem={({item}) => (
              <View style={styles.list}>
                <CompanyIdCard
                  id={item.id}
                  company_id={item.company_id}
                  loadCompanies={loadCompanies}
                />
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: '#2D3748',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4A5568',
    marginBottom: 16,
    paddingLeft: 8,
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#718096',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    fontWeight: '300',
    color: '#A0AEC0',
    textAlign: 'center',
    lineHeight: 24,
  },
});
