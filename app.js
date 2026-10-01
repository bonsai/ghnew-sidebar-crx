const owner = document.querySelector("#owner");
const name = document.querySelector("#repo-name");
const status = document.querySelector("#status");
const button = document.querySelector("#new");

let timer;
name.addEventListener("input", () => {
  clearTimeout(timer);
  button.disabled = true;
  const value = name.value.trim();
  if (!value) {
    status.textContent = "名前を入力するとチェックします";
    return;
  }
  timer = setTimeout(() => checkName(owner.value.trim(), value), 350);
});

async function checkName(owner, name) {
  status.textContent = "checking…";
  try {
    const response = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`
    );
    if (response.status === 404) {
      status.innerHTML = '<span class="available">✓ available</span>';
      button.disabled = false;
      button.onclick = () => {
        location.href = `https://github.com/new?name=${encodeURIComponent(name)}`;
      };
      return;
    }
    if (response.ok) {
      status.innerHTML =
        '<span class="exists">⚠ already exists</span>';
      button.disabled = true;
      return;
    }
    status.textContent = `check failed: ${response.status}`;
  } catch (error) {
    status.textContent = "check failed";
  }
}
