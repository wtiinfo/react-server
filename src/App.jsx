
import './App.css'
import { useState, useEffect } from 'react';


const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //RESGATANDO DADOS
  useEffect(() => {
    async function fetchData() {
      const req = await fetch(url);
      const data = await req.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  //ADICIONANDO DADOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    }

    console.log(product);

    const res = await fetch(
      url, 
      { method: "POST",
        headers: {"Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

  }

 

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

       <div className="add-product">
        <form onSubmit={handleSubmit}>
            <lable>Nome:
              <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
            </lable>
            <lable>Preço:
              <input type="text" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
            </lable>
            <input type="submit" value="Criar" />
        </form>
       </div>

     </div>
    </>
  )
}

export default App
