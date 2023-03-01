import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Box, Button, Container } from '@chakra-ui/react';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [log, setLog] = useState("");
  const readNFC = async () => {
    try {
      const reader = new NDEFReader();
      await reader.scan();

      reader.onreadingerror = (event) => {
        console.log(event);
        alert("何らかの原因で読み込みに失敗しました");
      };
      reader.onreading = (event) => {
        setLog(event.serialNumber);
      };

    } catch (error) {
      alert("NFCカードの読み込み準備に失敗しました");
    }

  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box w="full">
        <Container maxW="600px" mt={6}>
          <Box w="full" textAlign="center">
            <Button onClick={readNFC}>ボタン</Button>
          </Box>
          <Box>{log}</Box>
        </Container>
      </Box>
    </>
  );
}
