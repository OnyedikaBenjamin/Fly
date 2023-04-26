import { useEffect, useState } from "react";

const useGet = (url) => {

  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)
    
    useEffect(() => {
        fetch(url)
        .then(res => {
          return res.json();
        }).then(data => {
          setData(data)
        }).catch((err) => {
          setError(err)
        })
    },[url])

    return [ data, error];
};

export {useGet};

