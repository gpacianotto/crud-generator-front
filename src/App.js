import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Row, Col, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { useEffect, useState } from 'react';
import ModalConfig from './Components/ModalConfig';
import TestingApi from './Services/TestingApi';
import Swal from 'sweetalert2';
import SystemApi from './Services/SystemApi';
import Home from './Pages/Home';
import Sidebar from './Components/Sidebar';
import UserDataService from './Services/UserDataService';
import SystemList from './Pages/SystemList';
import SystemCreate from './Pages/SystemCreate';
import AccountList from './Pages/AccountList';
import TableCreate from './Pages/TableCreate';
import TableList from './Pages/TableList';
import HelpUs from './Pages/HelpUs';




function App() {
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [popover, setPopover] = useState(false);

  const systemApi = SystemApi.getInstance();
  const testingApi = TestingApi.getInstance();
  const userDataService = UserDataService.getInstance();

  useEffect(()=> {

    setInterval(() => setPopover(true), 1200000)

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

              // if(res === true)
              // {
              //   const info = userDataService.loadUser();

              //   console.log(info);
              //   console.log(isExpired(info.session));
            
                
            
              //   if(!info)
              //   {
              //     setLoggedIn(false);
                  
              //   }
              //   else if(!!isExpired(info.session))
              //   {
              //     userDataService.clearUser();
              //     redirect('/');
              //   }
              //   else{
              //     navigate('/home')
              //   }
              // }

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
            'Servidor Não conectado! Para conectar seu servidor rode o comando "node app.js"',
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

    testApi();

  }, [])
  
  return (
    <HashRouter>
      <ModalConfig showModal={showModal} setShowModal={setShowModal}/>



      {!userDataService.isSessionExpired() &&  <Sidebar/>}
      
      
      <Button style={{
        position: "fixed",
        bottom: "2%",
        right: "2%",
      }}
      onClick={() => {setShowModal(true)}}
      >
        Config
      </Button>
      <Button
        id='helpUs'
        style={{
          position: "fixed",
          top: "2%",
          right: "2%",
        }}
      >
        Ajude-nos
      </Button>
      <Popover target="helpUs"  isOpen={popover} toggle={() => setPopover(!popover)}>
        <PopoverHeader>
          Ajude-nos!
        </PopoverHeader>
        <PopoverBody>
          Crud Generator é um trabalho de conclusão de curso de um aluno da graduação em Ciência da Computação. Ajude-o a concluir o trabalho nos fornecendo seu feedback sobre a ferramenta.
          <Row className='mt-2'>
            <Col>
              <a target='_blank' href='https://forms.gle/BC2cfKV2r1zz94Ys9'>
                <Button 
                  onClick={() => {setPopover(!popover)}}
                  color='success'
                >
                  Claro!
                </Button>
              </a>
            </Col>
            <Col>
              <Button color='primary' onClick={() => {setPopover(!popover)}}>
                Mais tarde!
              </Button>
            </Col>
          </Row>
          
          
        </PopoverBody>
      </Popover>
      <Routes id="routes">
        <Route path="/" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/sign-up' element ={<SignUp/>}/>
        <Route path='/list/systems' element={<SystemList/>}/>
        <Route path='/list/accounts' element={<AccountList/>}/>
        <Route path='/create/systems' element={<SystemCreate/>}/>
        <Route path='/create/tables' element={<TableCreate/>}/>
        <Route path='list/tables' element={<TableList/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path='/help-us' element={<HelpUs/>}/>
      </Routes>
      
      {/* <Route path="/regex" element={<Regex/>}/>
      <Route path="/grammar" element={<Grammar/>}></Route> */}
    </HashRouter>
  );
}

export default App;
