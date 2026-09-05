import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';

export default function Localizacao() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function obterLocalizacao() {
    setLoading(true);
    setErro('');

    try {
      // Solicita permissão para acessar a localização
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErro('Permissão de localização negada.');
        return;
      }

      // Obtém a localização atual
      const localizacao =
        await Location.getCurrentPositionAsync({});

      setLatitude(localizacao.coords.latitude);
      setLongitude(localizacao.coords.longitude);
    } catch (error) {
      console.log(error);
      setErro('Não foi possível obter a localização.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Minha Localização
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={obterLocalizacao}
        disabled={loading}
      >
        <Text style={styles.textoBotao}>
          {loading ? 'Buscando...' : 'Obter Localização'}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          style={styles.loading}
        />
      )}

      {latitude !== null && longitude !== null && !loading && (
        <View style={styles.resultado}>
          <Text style={styles.label}>
            Latitude:
          </Text>

          <Text style={styles.valor}>
            {latitude}
          </Text>

          <Text style={styles.label}>
            Longitude:
          </Text>

          <Text style={styles.valor}>
            {longitude}
          </Text>
        </View>
      )}

      {erro !== '' && (
        <Text style={styles.erro}>
          {erro}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  botao: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  loading: {
    marginTop: 20,
  },

  resultado: {
    marginTop: 30,
    alignItems: 'center',
  },

  label: {
    fontSize: 18,
    marginTop: 10,
  },

  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },

  erro: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});