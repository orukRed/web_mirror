(function () {
  const video = document.getElementById('mirror');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const status = document.getElementById('status');

  let stream = null;

  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      video.srcObject = stream;
      startBtn.disabled = true;
      stopBtn.disabled = false;
      status.textContent = 'カメラが起動しました。';
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        status.textContent = 'カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。';
      } else if (err.name === 'NotFoundError') {
        status.textContent = 'カメラが見つかりませんでした。';
      } else {
        status.textContent = 'カメラを起動できませんでした: ' + err.message;
      }
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(function (track) { track.stop(); });
      stream = null;
    }
    video.srcObject = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    status.textContent = 'カメラを停止しました。';
  }

  startBtn.addEventListener('click', startCamera);
  stopBtn.addEventListener('click', stopCamera);
})();
