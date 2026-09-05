import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [modoEscuro, setModoEscuro] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carrega a preferência salva
  useEffect(() => {
    carregarTema();
  }, []);

  async function carregarTema() {
    try {
      const temaSalvo = await AsyncStorage.getItem('tema');

      if (temaSalvo !== null) {
        setModoEscuro(temaSalvo === 'escuro');
      }
    } catch (error) {
      console.log('Erro ao carregar tema:', error);
    } finally {
      setLoading(false);
    }
  }

  // Altera e salva a preferência
  async function alterarTema(valor: boolean) {
    setModoEscuro(valor);

    try {
      await AsyncStorage.setItem(
        'tema',
        valor ? 'escuro' : 'claro'
      );
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        modoEscuro && styles.containerEscuro,
      ]}
    >
      <Text
        style={[
          styles.titulo,
          modoEscuro && styles.textoEscuro,
        ]}
      >
        Preferência de Tema
      </Text>

      <Text
        style={[
          styles.texto,
          modoEscuro && styles.textoEscuro,
        ]}
      >
        {modoEscuro ? 'Modo escuro' : 'Modo claro'}
      </Text>

      <Switch
        value={modoEscuro}
        onValueChange={alterarTema}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  containerEscuro: {
    backgroundColor: '#121212',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },

  texto: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000000',
  },

  textoEscuro: {
    color: '#ffffff',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});