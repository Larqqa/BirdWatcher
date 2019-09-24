import anime from 'animejs';

const animate = {
  message: (handler, mes) => {

    // Create message
    const message = document.createElement('div');
    const text = document.createTextNode(mes);
    const time = new Date().getTime();
    message.classList.add('message');
    message.classList.add(handler);
    message.id = time;
    message.appendChild(text);
    document.getElementById('messageBox').append(message);

    // Message box animation
    const a = anime({
      targets: document.getElementById(time),
      keyframes: [
        { top: 0, duration: 500 },
        { top: -100, duration: 500, delay: 1000 },
      ],
      complete: () => {
        document.getElementById(time).remove();
      }
    });

    a.play();
  },
};

export default animate;
