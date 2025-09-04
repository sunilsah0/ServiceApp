import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, ScrollView, TextInput } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export default function App() {
  const [services, setServices] = useState([]);
  const [quote, setQuote] = useState(null);
  const [serviceId, setServiceId] = useState('cleaning');

  useEffect(() => {
    fetch(`${API_URL}/api/v1/services`).then(r => r.json()).then(setServices).catch(console.warn);
  }, []);

  const getQuote = async () => {
    const r = await fetch(`${API_URL}/api/v1/bookings/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_id: serviceId })
    });
    setQuote(await r.json());
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hemfrid-style App</Text>
        <Text>Backend: {API_URL}</Text>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Services</Text>
          {services.map(s => (
            <Text key={s.id}>• {s.name} — {s.baseDurationMin} min</Text>
          ))}
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Get Quote</Text>
          <TextInput
            value={serviceId}
            onChangeText={setServiceId}
            placeholder="service id (cleaning/windows)"
            style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
          />
          <Button title="Get Quote" onPress={getQuote} />
          {quote && (
            <View style={{ marginTop: 8 }}>
              <Text>Duration: {quote.duration_min} min</Text>
              <Text>Price: {quote.price.currency} {quote.price.amount}</Text>
              <Text>Slots:</Text>
              {quote.slots.map(s => <Text key={s}>- {s}</Text>)}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
