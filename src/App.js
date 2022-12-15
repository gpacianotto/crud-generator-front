import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Row, Col, Button } from 'reactstrap';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { useEffect, useState } from 'react';
import ModalConfig from './Components/ModalConfig';
import TestingApi from './Services/TestingApi';
import Swal from 'sweetalert2';
import SystemApi from './Services/SystemApi';


function App() {

  const [showModal, setShowModal] = useState(false);

  const systemApi = SystemApi.getInstance();
  const testingApi = TestingApi.getInstance();

  useEffect(()=> {

    async function testApi() {
      await testingApi.isApiOn().then((res) => {

        if(!!res)
        {
          Swal.fire(
            'OK',
            'Servidor Conectado!',
            'success'
          ).then(async () => {
            await testingApi.doesRootSystemExists().then((res) => {

              console.log(res);
              if(res === false)
              {
                Swal.fire(
                  'Ação necessária',
                  'Seu sistema Root ainda não existe, deseja criá-lo?',
                  'info'
                ).then(async () => {
                  await systemApi.createRootSystem().then((result) => {
                    Swal.fire(
                      'OK',
                      'Sistema root criado com sucesso!<br/>' +
                      'Dados do sistema: <br/>' +
                      'ID: ' + result.response.systemId + ' <br/>' +
                      'Nome: ' + result.response.name + ' <br/>' +
                      'URL Front: ' + result.response.urlFront + ' <br/>' +
                      'Framework: ' + result.response.framework + ' <br/>' +
                      'Linguagem: ' + result.response.lang + ' <br/>' +
                      'Token do sistema: ' + result.response.systemToken + ' <br/>' +
                      'Criado em: ' + result.response.createdAt + ' <br/>' +
                      ''
                      ,
                      'success'
                    )
                  })
                })
              }
              if(res === null)
              {
                Swal.fire(
                  'Erro',
                  'Houve um problema ao identificar se seu sistema root está cadastrado, certifique-se de que seu servidor está rodando.',
                  'error'
                )
              }
            })
          })
        }

        if(!res)
        {
          Swal.fire(
            'Erro',
            'Servidor Não conectado!, para conectar seu servidor rode o comando "node app.js"',
            'error'
          )
        }

        
      }).catch((err) => {
        Swal.fire(
          'Error',
          'error: ' + err,
          'error'
        )
      })
    }
    async function testIfRootSystemExists() {
      
    }

    testApi().then(() => {
      testIfRootSystemExists();
    })

  }, [])

  return (
    <Router>
      <ModalConfig showModal={showModal} setShowModal={setShowModal}/>

      

      <Button style={{
        position: "fixed",
        bottom: "2%",
        right: "2%",
      }}
      onClick={() => {setShowModal(true)}}
      >
        Config
      </Button>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/sign-up' element ={<SignUp/>}/>
      </Routes>
      
      {/* <Route path="/regex" element={<Regex/>}/>
      <Route path="/grammar" element={<Grammar/>}></Route> */}
    </Router>
  );
}

export default App;
