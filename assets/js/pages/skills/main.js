import { initSkills } from '../../../data/data.js';

console.log("1. main.js loaded");

const renderSkills = async () => {
    try {
        const skillsData = await initSkills();
        console.log("2. Data received:", skillsData);

        // HTML側の受け皿を取得（IDは skils.html と一致させる）
        // 今回はとりあえず全体を表示するために LANGUAGES を使ってみます
        const skillsSection = document.getElementById("LANGUAGES"); 
        
        if (!skillsSection) {
            console.error("3. Error: ID 'LANGUAGES' not found in HTML");
            return;
        }

        if (!skillsData) {
            console.error("3. Error: skillsData is null or undefined");
            return;
        }
        skillsData.forEach(category => {
            console.log("4. Rendering category:", category.category);
            
            // カテゴリごとのHTMLを作成
            const categoryHTML = `
                <section class="p-skill-section">
                    <h2 class="p-skill-section__title">${category.category}</h2>
                    <div class="p-skill-grid">
                        ${category.skills.map(skill => `
                            <div class="p-skill-card">
                                <div class="p-skill-card__header">
                                    <span class="p-skill-card__name">${skill.item}</span>
                                    <span class="p-skill-card__level">
                                        ${skill.level ? `${'★'.repeat(skill.level)}${'☆'.repeat(5 - skill.level)}` : ''}
                                    </span>
                                </div>
                                <p class="p-skill-card__date">
                                    ${skill.startedAt ? `Started: ${skill.startedAt}` : ''}
                                </p>
                                <p class="p-skill-card__desc">
                                    ${skill.description ? ` ${skill.description}` : ''}
                                </p>
                                <p>
                                    ${skill.examdate ? `受験日: ${skill.examdate}` : ''}
                                </p>
                                <p>
                                    ${skill.gettedAt ? `合格日: ${skill.gettedAt}` : ''}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `;
            skillsSection.insertAdjacentHTML('beforebegin', categoryHTML);
        });

    } catch (error) {
        console.error("Render Error:", error);
    }
};

// 実行
renderSkills();