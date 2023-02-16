import React, { useState, useEffect, useRef } from "react";

import _ from "lodash";

import { AnimateTitle as CSS } from "style";

// const texts = ["BRAVEGIRLS", "FEARLESS", "Goodbye"];
const texts = ["Goodbye"];

const colors = ["#ea4581", "#f1892a", "#ed4276", "#29adde", "#fcf242", "#ca61a6", "#a0cd58", "#8ccbdd"];

const AnimateTitle = (props) => {
  const { active } = props;
  const canvasRef = useRef();
  const [ctxTag, setCtxTag] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtxTag(context);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (ctxTag) {
      start();
    }

    // eslint-disable-next-line
  }, [ctxTag]);

  const start = () => {
    const canvas = ctxTag.canvas;
    let ctx = canvas.getContext("2d");
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    let particles = [];
    let amount = 0;
    let mouse = { x: 0, y: 0 };
    let radius = 0.5;
    let text = texts[Math.floor(Math.random() * 1)];
    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    function Particle(x, y) {
      this.x = Math.random() * cw;
      this.y = Math.random() * ch;

      this.dest = {
        x: x,
        y: y,
      };

      let rSize = cw > 768 ? 2 : 0.5;

      this.r = Math.random() * 5 + rSize;
      this.vx = (Math.random() - 0.5) * 20;
      this.vy = (Math.random() - 0.5) * 20;
      this.accX = 0;
      this.accY = 0;
      this.firction = Math.random() * 0.05 + 0.94;
      this.color = colors[Math.floor(Math.random() * 8)];
    }

    Particle.prototype.render = function () {
      this.accX = (this.dest.x - this.x) / 1000;
      this.accY = (this.dest.y - this.y) / 1000;
      this.vx += this.accX;
      this.vy += this.accY;
      this.vx *= this.firction;
      this.vy *= this.firction;

      this.x += this.vx;
      this.y += this.vy;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
      ctx.fill();

      let a = this.x - mouse.x;
      let b = this.y - mouse.y;

      let distance = Math.sqrt(a * a + b * b);

      if (distance < radius * 70) {
        this.accX = (this.x - mouse.x) / 100;
        this.accY = (this.y - mouse.y) / 100;
        this.vx += this.accX;
        this.vy += this.accY;
      }
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const onTouchEnd = (e) => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const initScene = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold " + cw / 8 + "px Noto Sans KR";
      ctx.textAlign = "center";
      const tw = ctx.measureText(text);
      let fontHeight = tw.actualBoundingBoxAscent + tw.actualBoundingBoxDescent;
      ctx.fillText(text, cw / 2, ch / 2 + fontHeight / 2);

      let data = ctx.getImageData(0, 0, cw, ch).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      particles = [];

      for (let i = 0; i < cw; i += Math.round(cw / 150)) {
        for (let j = 0; j < ch; j += Math.round(ch / 150)) {
          if (data[(i + j * cw) * 4 + 3] > 150) {
            particles.push(new Particle(i, j));
          }
        }
      }

      amount = particles.length;
    };

    const onMouseClick = () => {
      if (_.isEqual(radius, 0.5)) {
        radius = 5;
      }

      setTimeout(() => {
        radius = 0.5;
      }, 100);
    };

    const render = (a) => {
      window.requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < amount; i++) {
        particles[i].render();
      }
    };

    window.addEventListener("resize", initScene);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("click", onMouseClick);
    canvas.addEventListener("touchend", onTouchEnd);

    window.requestAnimationFrame(render);
    initScene();
  };

  return <CSS.Canvas active={active} ref={canvasRef} />;
};

export default AnimateTitle;
