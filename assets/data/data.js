// エラーメッセージ
const ERROR_MESSAGE = "データの読み込み中にエラーが発生しました:";

// データ読み込み処理
async function loadData(pass) {
    try {
        // コンフィグJSONファイルを取得
        const res = await fetch(pass);
        // JSONをオブジェクトに変換
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(ERROR_MESSAGE, error);
    }
}

// コンフィグデータの取得
export async function initConfig() {
    return await loadData('./assets/data/json/config.json');
}
// プロフィールデータの取得
export async function initProfile() {
    return await loadData('./assets/data/json/profile.json');
}
// Aboutデータの取得
export async function initAbout() {
    return await loadData('./assets/data/json/about.json');
}
// skillsデータの取得
export async function initSkills() {
    return await loadData('./assets/data/json/skills.json');
}
// worksデータの取得
export async function initWorks() {
    return await loadData('./assets/data/json/works.json');
}
// githubURLの取得
export async function initGithub() {
    return 'https://github.com/or121/';
}