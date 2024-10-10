import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  const PasswordGenrotor = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    PasswordGenrotor();
  }, [length, numAllowed, charAllowed, PasswordGenrotor])

  return (
    <>
      <div id="container">
        Password Genrator
        <div
          style={{
            width: "100%",
            display: "flex",
            height: "2.5rem",
            marginTop: "30px",
            marginBottom: "10px",
            backgroundColor: "blue",
          }}
        >
          <input
            type="text"
            value={Password}
            className="pass-input"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipBoard} id="copy-btn">copy</button>
        </div>
        <div className="box">
          <div className="box-child">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>length: {length}</label>
          </div>
          <div className="box-child">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="box-child">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
