import {Alert, StyleSheet, Text} from 'react-native';
import React from 'react';
import {deleteCompany, getDBConnection} from '../services/database';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

type Props = {
  id: number;
  company_id: string;
  loadCompanies: () => void;
};

export default function CompanyIdCard({id, company_id, loadCompanies}: Props) {
  function handleDelete() {
    Alert.alert(
      'Delete Company ID',
      `Are you sure you want to delete ${company_id}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Yes',
          onPress: async () => {
            const db = await getDBConnection();
            await deleteCompany(db, id);
            loadCompanies();
          },
          style: 'destructive',
        },
      ],
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.company_id}>{company_id}</Text>
      <Icon
        name="trash-outline"
        size={20}
        color="#718096"
        style={styles.icon}
        onPress={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDF2F7',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  companyId: {
    fontSize: 18,
    fontWeight: '400',
    color: '#2D3748',
    letterSpacing: 1,
  },
  icon: {
    opacity: 0.7,
  },
});
