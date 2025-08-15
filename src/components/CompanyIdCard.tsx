import {Alert, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {deleteCompany, getDBConnection} from '../services/database';

type Props = {
  id: number;
  company_id: string;
  loadCompanies: () => {};
};

export default function CompanyIdCard({id, company_id, loadCompanies}: Props) {
  function handleLongPress() {
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
    <TouchableOpacity onLongPress={handleLongPress}>
      <Text>{company_id}</Text>
    </TouchableOpacity>
  );
}
