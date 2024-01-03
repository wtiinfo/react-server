
import './App.css'
import { useState, useEffect } from 'react';

//USANDO CUSTOM HOOK
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //RESGATANDO DADOS
  //useEffect(() => {
  //async function fetchData() {
  //const req = await fetch(url);
  //const json = await req.json();
  //setProducts(json);
  //}
  //fetchData();
  //}, []);
  //USANDO CUSTOM HOOK
  const { data: items, httpConfig, loading, error } = useFetch(url);


  const handleDelete = (id) => {
    httpConfig(id, "DELETE");
  }

  //ADICIONANDO DADOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    }

    console.log(product);

    //const res = await fetch(
    // url,
    // {
    // method: "POST",
    //headers: {
    //"Content-Type": "application/json"
    //},
    //body: JSON.stringify(product)
    //});

    //CARREGAMENTO DINAMICO - ATUALIZANDO LISTA DE ITENS
    //const addedProduct = await res.json();//convertendo em objeto
    //setProducts((prevProducts) => [...prevProducts, addedProduct]);
    //resetando os inputs
    //REFATORANDO POST
    httpConfig(product, "POST")
    setName("");
    setPrice("");

  }

  return (
    <>
      <div className="App">
        <h1>List de produtos</h1>
        {/* loading */}
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error}</p>}
        {!error && <table>
          <tbody>
            {/*Se houver items = true, listar*/}
            {items && items.map((p) =>
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td><button onClick={() => handleDelete(p.id)}>Deletar</button></td>
              </tr>
            )}
          </tbody>
        </table> 
        }
        <div className="add-product">
          <form onSubmit={handleSubmit}>
            <lable>Nome:
              <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
            </lable>
            <lable>Preço:
              <input type="text" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
            </lable>
            {loading && <input type="submit" disabled value="Aguardar" />}
            {!loading && <input type="submit" value="Criar" />}
          </form>
        </div>
      </div>
    </>
  )
}

export default App
