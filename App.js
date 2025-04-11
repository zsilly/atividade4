import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import { useFonts } from 'expo-font';
import Slider from '@react-native-community/slider';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);
  const [showArtistInfo, setShowArtistInfo] = useState(false);
  const [showCommentFields, setShowCommentFields] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const [comment, setComment] = useState({
    nome: '',
    genero: '',
    localidade: '',
    comentario: '',
  });

  const [fontsLoaded] = useFonts({
    LongShot: require('./assets/fonts/Long_Shot.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const artistas = [
    {
      nome: 'Frida Kahlo',
      nascimento: '6 de julho de 1907 – 13 de julho de 1954',
      movimento: 'Surrealismo e Realismo Mágico',
      tecnica: 'Pintura a óleo',
      resumo: 'Frida Kahlo foi uma das artistas mais marcantes do século XX...',
      imagem: require('./assets/retrato1.jpg'),
    },
    {
      nome: 'Leonardo da Vinci',
      nascimento: '15 de abril de 1452 – 2 de maio de 1519',
      movimento: 'Renascimento',
      tecnica: 'Têmpera e óleo sobre madeira',
      resumo: 'Leonardo foi um verdadeiro polímata...',
      imagem: require('./assets/retrato2.jpg'),
    },
    {
      nome: 'Salvador Dalí',
      nascimento: '11 de maio de 1904 – 23 de janeiro de 1989',
      movimento: 'Surrealismo',
      tecnica: 'Óleo sobre tela',
      resumo: 'Dalí foi conhecido por sua arte provocativa...',
      imagem: require('./assets/retrato3.jpg'),
    },
    {
      nome: 'Claude Monet',
      nascimento: '14 de novembro de 1840 – 5 de dezembro de 1926',
      movimento: 'Impressionismo',
      tecnica: 'Óleo sobre tela',
      resumo: 'Monet foi um dos fundadores do impressionismo...',
      imagem: require('./assets/retrato4.jpg'),
    },
    {
      nome: 'Vincent van Gogh',
      nascimento: '30 de março de 1853 – 29 de julho de 1890',
      movimento: 'Pós-impressionismo',
      tecnica: 'Óleo sobre tela com pinceladas marcadas',
      resumo: 'Van Gogh é hoje um dos pintores mais admirados...',
      imagem: require('./assets/retrato5.jpg'),
    },
    {
      nome: 'Francisco Goya',
      nascimento: '30 de março de 1746 – 16 de abril de 1828',
      movimento: 'Romantismo',
      tecnica: 'Pintura a óleo e gravura',
      resumo: 'Goya foi um dos pintores mais importantes da Espanha...',
      imagem: require('./assets/retrato6.jpg'),
    },
  ];

  const artworks = [
    {
      image: require('./assets/dali.jpg'),
      title: 'A Persistência da Memória',
      author: 'Salvador Dalí',
      year: 1931,
      material: 'Óleo sobre tela',
      colors: 'Azul, marrom, dourado',
      description: 'Obra icônica com relógios derretendo...',
    },
    {
      image: require('./assets/dali2.jpg'),
      title: 'Paisagem Surrealista com Criança',
      author: 'Salvador Dalí',
      year: 1935,
      material: 'Óleo sobre tela',
      colors: 'Verde, bege, azul',
      description: 'Elementos da infância com mundo surreal...',
    },
    {
      image: require('./assets/goya.jpg'),
      title: 'O Grande Bode',
      author: 'Francisco Goya',
      year: 1821,
      material: 'Óleo sobre tela',
      colors: 'Preto, marrom, bege',
      description: 'Figura satânica em encontro sombrio...',
    },
    {
      image: require('./assets/goya2.webp'),
      title: 'Aparição Fantasmagórica',
      author: 'Francisco Goya',
      year: 1823,
      material: 'Óleo sobre tela',
      colors: 'Cinza, preto, tons de carne',
      description: 'Figuras espectrais com medo do desconhecido...',
    },
    {
      image: require('./assets/goya3.jpg'),
      title: 'Homem Rindo',
      author: 'Francisco Goya',
      year: 1820,
      material: 'Óleo sobre tela',
      colors: 'Preto, amarelo, branco',
      description: 'Obra que transmite inquietação e loucura...',
    },
    {
      image: require('./assets/monet.jpg'),
      title: 'Pôr-do-sol em Veneza',
      author: 'Claude Monet',
      year: 1908,
      material: 'Óleo sobre tela',
      colors: 'Laranja, azul, lilás',
      description: 'Entardecer em Veneza com tons vibrantes...',
    },
    {
      image: require('./assets/monet2.jpg'),
      title: 'Mulher com Sombrinha',
      author: 'Claude Monet',
      year: 1875,
      material: 'Óleo sobre tela',
      colors: 'Verde, branco, azul claro',
      description: 'Retrato da esposa e filho de Monet...',
    },
    {
      image: require('./assets/danvinci2.jpg'),
      title: 'Mona Lisa',
      author: 'Leonardo da Vinci',
      year: 1503,
      material: 'Têmpera e óleo sobre madeira',
      colors: 'Verde-oliva, marrom, amarelo',
      description: 'Obra mais reconhecida de Leonardo...',
    },
  ];

  const getArtistInfo = (author) => artistas.find((a) => a.nome === author);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.text, { marginRight: 10 }]}>
            {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            thumbColor={isDarkMode ? '#00cc99' : '#ccc'}
            trackColor={{ false: '#777', true: '#00cc99' }}
          />
        </View>
      </View>

      <ScrollView
        style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f2f2f2' }]}
        showsVerticalScrollIndicator={true}
      >
        {artworks.map((art, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedArt(art);
              setShowArtistInfo(false);
              setZoomLevel(1);
              setShowCommentFields(false);
            }}
            style={styles.card}
          >
            <Image source={art.image} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
              <Text style={styles.title}>{art.title}</Text>
              <Text style={styles.text}>Autor: {art.author}</Text>
              <Text style={styles.text}>Ano: {art.year}</Text>
              <Text style={styles.text}>Material: {art.material}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedArt && (
        <Modal visible={true} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={selectedArt.image}
                style={[styles.modalImage, { transform: [{ scale: zoomLevel }] }]}
                resizeMode="contain"
              />
              <Text style={styles.modalTitle}>{selectedArt.title}</Text>

              <Text style={styles.modalText}>Zoom:</Text>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={1}
                maximumValue={3}
                step={0.1}
                minimumTrackTintColor="#00cc99"
                maximumTrackTintColor="#777"
                value={zoomLevel}
                onValueChange={setZoomLevel}
              />

              <Text style={styles.modalText}>Mostrar artista</Text>
              <Switch
                value={showArtistInfo}
                onValueChange={setShowArtistInfo}
                thumbColor={showArtistInfo ? '#00cc99' : '#ccc'}
                trackColor={{ false: '#555', true: '#00cc99' }}
              />

              {showArtistInfo ? (() => {
                const artista = getArtistInfo(selectedArt.author);
                if (!artista) return <Text style={styles.modalText}>Artista não encontrado.</Text>;
                return (
                  <>
                    <Image
                      source={artista.imagem}
                      style={[styles.modalImage, { transform: [{ scale: zoomLevel }] }]}
                      resizeMode="contain"
                    />
                    <Text style={styles.modalText}>Zoom na imagem:</Text>
                    <Slider
                      style={{ width: 200, height: 40 }}
                      minimumValue={1}
                      maximumValue={3}
                      step={0.1}
                      minimumTrackTintColor="#00cc99"
                      maximumTrackTintColor="#777"
                      value={zoomLevel}
                      onValueChange={setZoomLevel}
                    />
                    <Text style={styles.modalTitle}>{artista.nome}</Text>
                    <Text style={styles.modalText}>Nascimento: {artista.nascimento}</Text>
                    <Text style={styles.modalText}>Movimento: {artista.movimento}</Text>
                    <Text style={styles.modalText}>Técnica: {artista.tecnica}</Text>
                    <Text style={styles.modalDescription}>{artista.resumo}</Text>
                  </>
                );
              })() : (
                <>
                  <Text style={styles.modalText}>Autor: {selectedArt.author}</Text>
                  <Text style={styles.modalText}>Ano: {selectedArt.year}</Text>
                  <Text style={styles.modalText}>Material: {selectedArt.material}</Text>
                  <Text style={styles.modalText}>Cores principais: {selectedArt.colors}</Text>
                  <Text style={styles.modalDescription}>{selectedArt.description}</Text>
                </>
              )}

              <Pressable
                onPress={() => setShowCommentFields((prev) => !prev)}
                style={[styles.closeButton, { marginTop: 10 }]}
              >
                <Text style={styles.closeButtonText}>Adicionar Comentário</Text>
              </Pressable>

              {showCommentFields && (
                <View style={{ width: '100%', marginTop: 10 }}>
                  {['nome', 'genero', 'localidade', 'comentario'].map((field) => (
                    <TextInput
                      key={field}
                      placeholder={field.toUpperCase()}
                      placeholderTextColor="#999"
                      value={comment[field]}
                      onChangeText={(text) =>
                        setComment((prev) => ({ ...prev, [field]: text }))
                      }
                      style={styles.input}
                      multiline={field === 'comentario'}
                    />
                  ))}
                </View>
              )}

              <Pressable onPress={() => setSelectedArt(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: 130, height: 130 },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'LongShot',
    marginBottom: 4,
  },
  text: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'LongShot',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'LongShot',
    marginBottom: 10,
  },
  modalText: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'LongShot',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalDescription: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'LongShot',
    marginTop: 10,
    textAlign: 'justify',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'LongShot',
  },
  input: {
    backgroundColor: '#3a3a3a',
    color: '#fff',
    fontFamily: 'LongShot',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
});
