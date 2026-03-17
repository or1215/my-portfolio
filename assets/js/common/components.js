/* ヘッダーとフッターの共通コンポーネント */

/* ヘッダー生成 */
class CustomHeader extends HTMLElement {
  setup(data) {
    const email = data.email || "No Email";
    const label = data.label || "Contact";
    
    this.innerHTML = `
      <header class="c-header">
        <div class="c-header__inner">
            <a href="/" class="c-header__logo">MY - PORTFOLIO</a>
            <input id="nav-input" type="checkbox" class="nav-hidden" style="display: none;" />
            <label id="menu-btn" for="nav-input"><span></span></label>
            <nav class="c-nav">
                <a href="/index.html#profile" class="c-nav__link">Profile</a>
                <a href="/index.html#projects" class="c-nav__link">Projects</a>
                <a href="/index.html#skills" class="c-nav__link">Skills</a>
                <a class="c-btn-contact" id="contact-input">${label}</a>
            </nav>
        </div>
      </header>
    `;

    const contactBtn = this.querySelector('#contact-input');
    contactBtn.addEventListener('click', () => {
        const isConfirmed = confirm(`${email} 宛にメールを作成しますか？`);
        if (isConfirmed) {
            window.location.href = `mailto:${email}`;
        }
    });
  }
}

class CustomFooter extends HTMLElement {
  setup(data) {
    const year = new Date().getFullYear();
    const copyright = data.site?.copyright || `Portfolio. All rights reserved.`;
    this.innerHTML = `
      <footer class="c-footer">
        <div class="c-footer__inner">
          <p class="c-footer__copy">&copy; ${year} ${copyright}</p>
          <div class="c-footer__sns">
            <a href="" class="c-footer__sns-link" target="_blank">GitHub</a>
          </div>
        </div>
      </footer>
    `;
  }
}

/* カスタムエレメントの定義と初期化 */
customElements.define('custom-header', CustomHeader);
customElements.define('custom-footer', CustomFooter);

/* 初期化 */
document.addEventListener('DOMContentLoaded', async () => {
  const header = document.querySelector('custom-header');
  const footer = document.querySelector('custom-footer');

  const { initConfig } = await import('/assets/data/data.js');
  const configData = await initConfig();
  if (configData) {
    await Promise.all([
      customElements.whenDefined('custom-header'),
      customElements.whenDefined('custom-footer')
    ]);

    if (header) header.setup(configData);
    if (footer) footer.setup(configData);
  }
});