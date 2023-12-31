
import './App.css'
import { useState, useEffect } from 'react';


const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

  //RESGATANDO DADOS
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  //ADICIONANDO DADOS
  

 

  return (
    <>
     <div className="App">
      <h1>List de produtos</h1>
    
       <table>
        <thead>
          <th>Item</th>
          <th>Preço</th>
        </thead>
        <tbody>
          {products.map((p) => 
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
            </tr>
          )}
        </tbody>
       </table>

     </div>
    </>
  )
}

export default App
