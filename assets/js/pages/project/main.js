import { initWorks } from '/my-portfolio/assets/data/data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const worksData = await initWorks();
    // 企業案件
    const businessWorks = worksData.filter(w => w.category.includes('Enterprise'));
    // 個人制作
    const personalWorks = worksData.filter(w => !w.category.includes('Enterprise'));

    /* 実績生成 */
    /* 企業案件セクションの生成 */
    const business_container = document.getElementById('WORKS_LIST_BUSINESS');
    const business = createBusinessWorksSection(businessWorks);
    business_container.innerHTML = business;   
    /* 個人制作セクションの生成 */
    const personal_container = document.getElementById('WORKS_LIST_PERSONAL');
    const personal = createPersonalWorksSection(personalWorks);
    personal_container.innerHTML = personal;
});

// 実務実績セクションの生成
function createBusinessWorksSection(worksData) {
    // データがない、または空配列の場合の処理
    if (!worksData || worksData.length === 0) return "<p>現在、企業案件はありません。</p>";

    const worksHtml = worksData.map(work => `
        <article class="c-card c-card--business">
            <div class="c-card__body">
                <div class="c-card__header">
                    <p class="c-card__period">${work.period}</p>
                    <h2 class="c-card__title">${work.title}</h2>
                    <p class="c-card__category">${work.category}</p>
                </div>

                <p class="c-card__desc">${work.description}</p>

                <!-- スクロール表示される業務詳細 -->
                <ul class="c-card__details">
                    ${work.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>

                <!-- こだわり・ポイント -->
                <div class="c-card__highlights">
                    <p><strong>💡 Point:</strong> ${work.highlights}</p>
                </div>

                <div class="c-card__tags">
                    ${work.techStack.map(tech => `<span class="c-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');

    return worksHtml;
}

// 個人制作セクションの生成
function createPersonalWorksSection(worksData) {
    if (!worksData) return "<p>現在、個人プロジェクトはありません。</p>";
    const worksHtml = worksData.map(work => 
        `
        <article class="c-card">
            <div class="c-card__img-wrapper">
                <img src="${work.thumbnail}" alt="${work.title}" loading="lazy">
            </div>
            <div class="c-card__body">
                <p class="c-card__period">${work.period}</p>
                <h2 class="c-card__title">${work.title}</h2>
                <p class="c-card__category">${work.category}</p>
                <p class="c-card__desc">${work.description}</p>

                <!-- 目的 -->
                ${work.objective ? `
                    <div class="c-card__objective">
                        <p><strong>🎯 目的:</strong> ${work.objective}</p>
                    </div>
                ` : ''}

                <!-- スクロール表示される詳細情報 -->
                ${work.details && work.details.length > 0 ? `
                    <ul class="c-card__details">
                        ${work.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                ` : ''}

                <div class="c-card__tags">
                    ${work.techStack.map(tech => `<span class="c-tag">${tech}</span>`).join('')}
                </div>
                
                <div class="c-card__links">
                    ${work.githubUrl ? `<a href="${work.githubUrl}" target="_blank" class="c-link">GitHub</a>` : ''}
                    ${work.siteUrl ? `<a href="${work.siteUrl}" target="_blank" class="c-link">Visit Site</a>` : ''}
                </div>
            </div>
        </article>
        `).join('');

    return worksHtml;
}