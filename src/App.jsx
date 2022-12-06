import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './styles.css';
import React from 'react';

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`;

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`;

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`;

function App() {
  const [tarefas, setTarefas] = useState(
    JSON.parse(localStorage.getItem('tarefa')) || []
  );
  const [inputValue, setInputValue] = useState('');
  const [filtro, setFiltro] = useState('');
  // segunda parte do exercicio 3
  useEffect(() => {
    tarefas.length > 0 &&
      localStorage.setItem('tarefa', JSON.stringify(tarefas));
  }, [tarefas]);

  // useEffect(()=>{
  //   JSON.parse(localStorage.getItem('tarefa'))}, [])

  // {setTarefas(JSON.parse(localStorage.getItem('tarefa')))},[])

  // primeira parte do exercicio 1
  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };
  // segunda parte do exercicio 1
  const criaTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: inputValue,
      completa: false,
    };
    const tarefaAdicionada = [...tarefas, novaTarefa];
    setTarefas(tarefaAdicionada);
    setInputValue('');
  };
  // primeira parte do exercicio 2
  const selectTarefa = (id) => {
    setTarefas(
      tarefas.map((item) =>
        item.id == id ? { ...item, completa: !item.completa } : item
      )
    );
  };
  //   const novaLista = tarefas.map((item)=>{
  //     if(id === item.id){
  //       const novoItem = {...item, completa: !item.completa}
  //       return novoItem
  //     } else{
  //       return item
  //   }
  // });
  // setTarefas(novaLista)

  // primeira parte do exercicio 3
  const onChangeFilter = (event) => {
    setFiltro(event.target.value);
  };

  const listaFiltrada = tarefas.filter((tarefa) => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa;
      case 'completas':
        return tarefa.completa;
      default:
        return true;
    }
  });

  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} onChange={onChangeInput} />
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map((tarefa) => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          );
        })}
      </TarefaList>
    </div>
  );
}

export default App;
