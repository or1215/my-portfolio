import { initSkills } from '/my-portfolio/assets/data/data.js';


/* スキルデータを描画する */
const renderSkills = async () => {
    try {
        const skillsData = await initSkills();
        const skillsSection = document.getElementById("LANGUAGES"); 
        if (!skillsSection || !skillsData) return;

        // ---  描画処理 ---
        skillsData.forEach(category => {
            const categoryHTML = `
                <section class="p-skill-section">
                    <h2 class="p-skill-section__title">${category.category}</h2>
                    <div class="p-skill-grid">
                        ${category.skills.map((skill, index) => `
                            <div class="p-skill-card js-skill-card" 
                                 data-category="${category.category}" 
                                 data-index="${index}">
                                <div class="p-skill-card__header">
                                    <span class="p-skill-card__name">${skill.item}</span>
                                    ${skill.level ? `
                                        <span class="p-skill-card__level">
                                            ${'★'.repeat(skill.level || 0)}${'☆'.repeat(5 - (skill.level || 0))}
                                        </span>
                                    ` : ''}
                                </div>
                                <p class="p-skill-card__desc">${skill.description?.length > 15 ? skill.description.substring(0, 15) + '...' : skill.description || ''}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `;
            skillsSection.insertAdjacentHTML('beforebegin', categoryHTML);
        });

        // --- モーダル制御の追加 ---
        setupModal(skillsData);

    } catch (error) {
        console.error("Render Error:", error);
    }
};

/* モーダル制御の設定 */
const setupModal = (skillsData) => {
    const modal = document.getElementById("skill-modal");
    const modalBody = document.getElementById("modal-body");
    const closeBtn = document.querySelector(".p-modal__close");
    const cards = document.querySelectorAll(".js-skill-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const catName = card.dataset.category;
            const index = card.dataset.index;
            
            // 該当するデータを探す
            const category = skillsData.find(c => c.category === catName);
            const skill = category.skills[index];

            /* モーダルの内容を動的に生成 */
            /* タイトルの追加 (ない場合処理をスキップ) */
            const skillTitle = skill.item || null;
            if (!skillTitle) return;
            const titleLavel = document.createElement("h2");
            titleLavel.textContent = skillTitle;
            titleLavel.classList.add("content_title");
            modalBody.appendChild(titleLavel);
            /* レベル表示の追加 */
            const levelLavel = document.createElement("span");
            if (skill.level) {
                levelLavel.textContent = '★'.repeat(skill.level) + '☆'.repeat(5 - skill.level);
                levelLavel.classList.add("content_level");
                modalBody.appendChild(levelLavel);
            } 
            /* 習得開始日の追加 */
            if (skill.startedAt) {
                const startedAtLavel = document.createElement("p");
                startedAtLavel.innerHTML = `<strong>習得開始 : </strong> ${skill.startedAt}`;
                modalBody.appendChild(startedAtLavel);
            }
            /* 詳細解説の追加 */
            if (skill.description) {
                const descriptionLavel = document.createElement("p");
                descriptionLavel.innerHTML = `<strong>詳細解説 : </strong>${skill.description}`;
                modalBody.appendChild(descriptionLavel);
            }
            /* 備考の追加 */
            if (skill.note && skill.note.length > 0) {
                const noteLavel = document.createElement("div");
                noteLavel.innerHTML = `<strong>備考 : </strong><br><ul class="note_label">${skill.note.map(n => `<li>${n}</li>`).join('')}</ul>`;
                modalBody.appendChild(noteLavel);
            }
            /* 合格日の追加 */
            if (skill.gettedAt) {
                const gettedAtLavel = document.createElement("p");
                gettedAtLavel.innerHTML = `<span style="color:#10b981;">✔ 合格日: ${skill.gettedAt}</span>`;
                modalBody.appendChild(gettedAtLavel);
            }
            /* 受験日の追加 */
            if (skill.examdate) {
                const examAtLavel = document.createElement("p");
                examAtLavel.innerHTML = `<span style="color:#f59e0b;">⚠ 受験日: ${skill.examdate}</span>`;
                modalBody.appendChild(examAtLavel);
            }

            modal.style.display = "block";
        });
    });

    // 閉じる処理
    closeBtn.onclick = () =>{ 
        modal.style.display = "none";
        modalBody.innerHTML = "";
    };
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            modalBody.innerHTML = "";
        }
    };
};

renderSkills();