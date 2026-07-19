import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PaginaCursos from './Cursos.jsx'

function Router() {
  const path = window.location.pathname;
  if (path === '/cursos')      return <PaginaCursos />;
  if (path === '/avaliar')     return <Avaliacoes />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
