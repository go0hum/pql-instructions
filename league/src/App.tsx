import {RoutesLeague} from './routers/RoutesLeague';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Container className={openMenu?"active": ""}>
            <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <RoutesLeague />
        </Container>
      </BrowserRouter>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns:90px auto;
  background: #EDF3FB;
  transition: all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
`

export default App
