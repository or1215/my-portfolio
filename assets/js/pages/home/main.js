// ページ読み込み時に実行
import { initProfile, initAbout, initSkills, initWorks } from '/my-portfolio/assets/data/data.js';

/* 表示するプロフィール項目 */
const profileDisplayList = ["NAME","JOB","SNS"];
/* 表示するwork項目 */
const workDisplayList = ["calendar-app","blog-app", "serverless-news-summarizer"];

/* 共通コンポーネントの初期化 */
document.addEventListener('DOMContentLoaded', async () => {
    // プロフィールの生成
    const profileData = await initProfile();
    createProfile(profileData);
    // Aboutセクションの生成
    const aboutData = await initAbout();
    createAbout(aboutData);
    // SKILLSセクションの生成
    const skillsData = await initSkills();
    createSkillsList(skillsData);
    // WORKSセクションの生成
    const worksData = await initWorks();
    createWorksList(worksData);
});

/* プロフィール生成 */
function createProfile(profileData) {
    const content = "profile-content";
    const profileSection = document.getElementById(content);
    if (!profileSection || !profileData) return;
    profileDisplayList.forEach(display => {
        profileSection.appendChild(createProfileItems(profileData[display]));
    });
}

/* 表示するプロフィール項目の生成 */
function createProfileItems(display) {
    // 0. 引数
    const item = 'profile-item';
    const title = 'profile-item-title';
    const text = 'profile-item-text';

    // 1. 各項目の親要素を作成
    const itemDiv = document.createElement('div');
    itemDiv.classList.add(item);

    // 2. タイトル（ラベル）の作成
    const titleEl = document.createElement('h2');
    titleEl.classList.add(title);
    titleEl.textContent = display.label;
    itemDiv.appendChild(titleEl);

    // 3.  values 配列をループして p タグを生成
    const textEl = document.createElement('p');
    textEl.classList.add(text);
    let textWrapper = '';
    display.values.forEach(val => {
        textWrapper += val + ' ';
    });
    textEl.innerHTML = textWrapper;
    itemDiv.appendChild(textEl);

    return itemDiv;
}
/* Aboutセクションの生成 */
function createAbout(aboutData) {

    // 0. 引数
    const aboutSection = document.getElementById('about');
    if (!aboutSection || !aboutData) return;
    const title = 'about-catchphrase';
    const text = 'about-text';

    // 1. 各項目の親要素を作成
    const aboutContent = document.getElementById('about-content');

    // 2. タイトル（ラベル）の作成
    const catchphraseEl = document.createElement('h2');
    catchphraseEl.classList.add(title);
    catchphraseEl.textContent = aboutData.catchphrase;
    aboutContent.appendChild(catchphraseEl);

    // 3.  values 配列をループして p タグを生成
    aboutData.contents.forEach(value => {
        const div = document.createElement('div');
        div.classList.add(text);
        div.textContent = value;
        aboutContent.appendChild(div);
    });

    aboutSection.appendChild(aboutContent);
}
/* SKILLSセクションの生成 */
function createSkillsList(skillsData) {
    const content = document.getElementById('skills-content');
    if (!skillsData || !content) return;

    skillsData.forEach(group => {
        // カテゴリごとのブロック作成
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('skill-category-group');
        
        categoryDiv.innerHTML = `
            <h3 class="category-name">${group.category}</h3>
            <ul class="skill-list">
                ${group.skills.map(skill => skillItem(skill, group.category)).join('')}
            </ul>
        `;
        content.appendChild(categoryDiv);
    });
}
// スキルアイテムのHTML生成
function skillItem(skill,category) {
    if (!skill.item) return '';
    return `
            <li class="skill-item">
                <span class="skill-name">${skill.item}</span>
                <span class="skill-level">${getSkillLevel(skill.level)}</span>
                <span class="skill-period">(${getSkillPeriod(skill,category)})</span>
            </li>
            `
}
// スキルレベルの取得
function getSkillLevel(level) {
    if (!level) return '';
    const maxLevel = 5;
    const filledStars = '★'.repeat(level);
    const emptyStars = '☆'.repeat(maxLevel - level);
    return filledStars + emptyStars;
}
// スキル年数ラベルの設定
function getSkillPeriod(skill,category) {
    if (category === "資格") {
        return getCertificationPeriod(skill);
    }
    if (skill.startedAt) {
        return calculateExperience(skill.startedAt);
    }
    if (skill.gettedAt) {
        return "取得日：" + skill.gettedAt;
    }
    return "準備中";
}
// 資格の年数表示
function getCertificationPeriod(skill) {
    // 資格状況の取得
    const status = skill.status;
    console.log("status:", status);
    if (status === "passed") return "★合格：" + (skill.gettedAt? skill.gettedAt + "取得" : "");
    if (status === "preparing") return "準備中：" + (skill.examdate? skill.examdate + "受験" : "受験日未定");
    if (status === "studying") return "勉強中：" + (skill.startedAt? skill.startedAt + "開始": "勉強開始日未定");
    return "未定";
}
// 経験年数の計算
function calculateExperience(startedAt) {
    const start = new Date(startedAt + "-01");
    const now = new Date();
    const diffMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    
    if (diffMonths < 0) return "準備中";
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    
    const result = [];
    if (years > 0) result.push(`${years}年`);
    if (months > 0 || years === 0) result.push(`${months}ヶ月`);
    return result.join(' ');
}
/* WORKSセクションの生成 */
function createWorksList(worksData) {
    const content = document.getElementById('works-content');
    if (!worksData || !content) return;
    content.innerHTML = renderWorks(worksData);
}
// WORKSセクションのHTML生成
function renderWorks(worksData) {
    // カテゴリごとに仕分け
    // 企業案件
    const businessWorks = worksData.filter(w => w.category.includes('Enterprise'));
    // 個人制作
    const personalWorks = worksData.filter(w => !w.category.includes('Enterprise'));
    let html = '';
    // 1. 実務実績のセクション
    html += createBusinessWorks(businessWorks);
    // 2. 個人制作のセクション
    html += createPersonalWorks(personalWorks);
    return html;
}
// 実務実績の生成
function createBusinessWorks(businessWorks) {
    let html = '';
    if (businessWorks.length > 0) {
        html += `<h2 class="work-group-title">Business Experience</h2>`;
        businessWorks.forEach(work => {
            html += `
                <div class="work-item business-item">
                    <div class="work-info">
                        <div class="work-header">
                            <span class="work-period">${work.period}</span>
                            <h3 class="work-title">${work.title}</h3>
                        </div>
                        <p class="work-description">${work.description}</p>
                        <div class="work-highlights">
                            <strong>💡 Point:</strong> ${work.highlights}
                        </div>
                        <div class="tech-stack">
                            ${work.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    }
    return html;
}
// 個人制作の生成
function createPersonalWorks(personalWorks) {
    let html = '';
    if (personalWorks.length > 0) {
        html += `<h2 class="work-group-title">Personal Projects</h2>`;
        html += `<div class="personal-grid">`;
        personalWorks.forEach(work => {
            if (!workDisplayList.includes(work.id)) return; // 表示する作品を絞る
            html += `
                <div class="work-item personal-item">
                    <div class="work-info">
                        <h3 class="work-title">${work.title}</h3>
                        <p class="work-description">${work.description}</p>
                        <div class="tech-stack">
                            ${work.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="work-links">
                            ${work.githubUrl ? `<a href="${work.githubUrl}" target="_blank" class="btn-link">GitHub</a>` : ''}
                            ${work.siteUrl ? `<a href="${work.siteUrl}" target="_blank" class="btn-link">Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }
    return html;
}