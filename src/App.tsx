import { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

import { GiPieSlice, GiLava, GiJigsawPiece } from "react-icons/gi";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoMdImages } from "react-icons/io";

import "./styles/roulette.scss";
import "./styles/modal.scss";

// posição 6 é a numero 1
const data = [
  { name: "Torta na cara", value: 200, fill: "#2980B9" }, // Perguntas e respostas com pontuação, resposta errada / não conseguiu responder
  { name: "Torta na cara", value: 200, fill: "#2980B9" }, //  Perguntas e respostas com pontuação, resposta errada / não conseguiu responder
  { name: "Torta na cara", value: 200, fill: "#2980B9" }, //  Perguntas e respostas com pontuação, resposta errada / não conseguiu responder

  { name: "O chão é lava", value: 200, fill: "#C0392B" }, // meia escora

  { name: "Quebra cabeça", value: 200, fill: "#7F8C8D" }, // Quebra cabeça biblico, contra o tempo

  // -------------> 1
  { name: "Qual a música", value: 200, fill: "#0FA056" }, // Qual a música
  { name: "Qual a música", value: 200, fill: "#0FA056" }, // Qual a música

  { name: "Imagem e ação", value: 200, fill: "#8E44AD", disable: true }, // Imagem e ação para o grupo.
];

const App = () => {
  const audio = new Audio('/src/assets/roulette.mp3');
  const audioDelicia = new Audio('/src/assets/delicia.mp3')

  const [escrita, setEscrita] = useState("");
  const [icon, setIcon] = useState(0);
  const [Numbers, setNumbers] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  const spinner = () => {
    audio.currentTime = 0;
    audio.play();

    const modal = document.getElementById("modal_overlay");
    const spinner = document.querySelector(".pie_chart");
    const arrow = document.querySelector(".arrow");
    setDisabled(true);

    // // Sortear numero
    if (Numbers.length >= 8) {
      alert("já foram sorteados todos os números");
      return;
    }

    var randomNumber = Math.floor(Math.random() * 8) + 1;
    console.log(Numbers);
    if (Numbers.length >= 1) {
      spinner?.classList.remove(`position-${Numbers[Numbers.length - 1]}`);
    }

    // While de adição e verificação
    if (!Numbers.includes(randomNumber)) {
      // Numbers.push(randomNumber);
      setNumbers((old) => [...old, randomNumber]);
    } else {
      while (Numbers.includes(randomNumber)) {
        if (randomNumber >= 8) {
          randomNumber = 1;
        } else {
          randomNumber = randomNumber + 1;
        }
      }

      if (!Numbers.includes(randomNumber)) {
        setNumbers((old) => [...old, randomNumber]);
      }
    }

    // Gira a roda
    spinner?.classList.add("spin");
    arrow?.classList.add("arrow_spin");

    setTimeout(() => {
      spinner?.classList.remove(`spin`);

      spinner?.classList.add(`position-${randomNumber}`);
    }, 18000);

    setTimeout(() => {
      arrow?.classList.remove("arrow_spin");

      console.log(Numbers);
      setDisabled(false);
      handleModal(randomNumber, modal);

      audio.pause();
    }, 21000);
  };

  // Show modal
  function handleModal(number: number, modal: any) {
    audioDelicia.currentTime = 0;
    audioDelicia.play();
    setIcon(number);
    if (number == 1 || number == 8) {
      setEscrita("Qual é a música");
    } else if (number == 2) {
      setEscrita("Imagem e ação");
    } else if (number == 3 || number == 4 || number == 5) {
      setEscrita("Torta na cara");

    } else if (number == 6) {
      setEscrita("O chão é lava");
    } else if (number == 7) {
      setEscrita("Quebra cabeça");
    }

    console.log(modal);
    if (modal) {
      modal.style.visibility = "visible";
    }
  }

  return (
    <>
      {/* Multiplicar de acordo com o tamanho da pagina */}
      <PieChart width={600} height={600} className="pie_chart">
        <Pie
          data={data}
          dataKey="value"
          outerRadius={250}
          fill="green"
          isAnimationActive={true}
          labelLine={false}
          // label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>

      <div className="legenda">
        <span>
          <div className="square torta"></div>
          Torta na cara
        </span>
        <span>
          <div className="square chao_lava"></div>O chão é lava
        </span>
        <span>
          <div className="square quebra_cabeca"></div>
          Quebra cabeça
        </span>
        <span>
          <div className="square musica"></div>
          Qual é a música
        </span>
        <span>
          <div className="square imagem_acao"></div>
          Imagem e ação
        </span>
      </div>

      <button disabled={disabled} className="btn-spin" onClick={spinner}>
        Rodar
      </button>

      <div className="arrow"></div>

      <div
        className="modal_overlay"
        id="modal_overlay"
        onClick={(e) => {
          const modal = document.getElementById("modal_overlay");

          if (modal) {
            if (modal.style.visibility == "visible")
              modal.style.visibility = "hidden";
          }
        }}
      >
        <h1>
          {escrita}
          {(icon == 1 || icon == 8) && (
            <BsMusicNoteBeamed className="icon" size={120} />
          )}
          {icon == 2 && <IoMdImages className="icon" size={120} />}
          {(icon == 3 || icon == 4 || icon == 5) && (
            <GiPieSlice className="icon" size={120} />
          )}
          {icon == 6 && <GiLava className="icon" size={120} />}
          {icon == 7 && <GiJigsawPiece className="icon" size={120} />}
        </h1>
      </div>
    </>
  );
};

export default App;
