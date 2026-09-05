import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Nota = {
  id: string;
  texto: string;
};

export default function Notas() {
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]);

  // Carregar notas quando abrir o aplicativo
  useEffect(() => {
    carregarNotas();
  }, []);

  async function carregarNotas() {
    try {
      const notasSalvas = await AsyncStorage.getItem('notas');

      if (notasSalvas !== null) {
        setNotas(JSON.parse(notasSalvas));
      }
    } catch (error) {
      console.log('Erro ao carregar notas:', error);
    }
  }

  // Salvar notas no AsyncStorage
  async function salvarNotas(novasNotas: Nota[]) {
    try {
      await AsyncStorage.setItem(
        'notas',
        JSON.stringify(novasNotas)
      );
    } catch (error) {
      console.log('Erro ao salvar notas:', error);
    }
  }

  // Adicionar uma nova nota
  async function adicionarNota() {
    if (nota.trim() === '') {
      return;
    }

    const novaNota: Nota = {
      id: Date.now().toString(),
      texto: nota.trim(),
    };

    const novasNotas = [...notas, novaNota];

    setNotas(novasNotas);
    setNota('');

    await salvarNotas(novasNotas);
  }

  // Excluir uma nota
  async function excluirNota(id: string) {
    const novasNotas = notas.filter(
      (item) => item.id !== id
    );

    setNotas(novasNotas);

    await salvarNotas(novasNotas);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Minhas Notas
      </Text>

      <View style={styles.areaAdicionar}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova nota"
          value={nota}
          onChangeText={setNota}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={adicionarNota}
        >
          <Text style={styles.textoBotao}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        contentContainerStyle={
          notas.length === 0 && styles.listaVazia
        }
        ListEmptyComponent={
          <Text style={styles.semNotas}>
            Nenhuma nota adicionada.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.nota}>
            <Text style={styles.textoNota}>
              {item.texto}
            </Text>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirNota(item.id)}
            >
              <Text style={styles.textoExcluir}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  areaAdicionar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  lista: {
    flex: 1,
  },

  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  semNotas: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },

  nota: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  textoNota: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },

  botaoExcluir: {
    backgroundColor: '#e53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },
});