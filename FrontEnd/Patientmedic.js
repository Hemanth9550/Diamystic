import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [formData, setFormData] = useState({
    date: '',
    height: '',
    weight: '',
    whr: '',
    sLevel: '',
    srUrea: '',
    srCreatinine: '',
    eca: '',
    hbalc: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted: ', formData);
  };

  return (
    <View style={styles.app}>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date:</Text>
          <TextInput
            style={styles.input}
            value={formData.date}
            onChangeText={(value) => handleChange('date', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Anthropometry</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Height</Text>
            <TextInput
              style={styles.input}
              value={formData.height}
              onChangeText={(value) => handleChange('height', value)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
              style={styles.input}
              value={formData.weight}
              onChangeText={(value) => handleChange('weight', value)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>WHR</Text>
            <TextInput
              style={styles.input}
              value={formData.whr}
              onChangeText={(value) => handleChange('whr', value)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>S.Level</Text>
            <TextInput
              style={styles.input}
              value={formData.sLevel}
              onChangeText={(value) => handleChange('sLevel', value)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lab Values</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Sr.Urea</Text>
            <TextInput
              style={styles.input}
              value={formData.srUrea}
              onChangeText={(value) => handleChange('srUrea', value)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Sr.Creatinine</Text>
            <TextInput
              style={styles.input}
              value={formData.srCreatinine}
              onChangeText={(value) => handleChange('srCreatinine', value)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>ECA</Text>
            <TextInput
              style={styles.input}
              value={formData.eca}
              onChangeText={(value) => handleChange('eca', value)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>HBALC</Text>
            <TextInput
              style={styles.input}
              value={formData.hbalc}
              onChangeText={(value) => handleChange('hbalc', value)}
            />
          </View>
        </View>

        <Button title="Add" onPress={handleSubmit} color="#add8e6" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: 300,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    backgroundColor: '#add8e6',
    padding: 5,
    textAlign: 'center',
    borderRadius: 4,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    display: 'block',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});