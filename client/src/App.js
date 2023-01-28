import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch('/api/home')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {data && <p>Hello {data.display_name}</p>}
    </div>
  );
}

export default App;
