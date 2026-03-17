// assets/js/common/data.js

export const PROFILE_DATA = {
    hero: {
        // メインコピー：一番伝えたい価値
        title: "アイデアを形に。最適な技術で、安心・安定で動くサービスを世界へ届ける。",
        // サブタイトル：あなたの役割とスタンス
        subtitle: "想いを「動く形」に変える。価値あるサービスを構築するエンジニア",
        // 説明文：具体的な活動内容への橋渡し
        description: "「作りたい」という想いやアイデアを、確かな技術で形にします。Webアプリケーションの開発からAWSによる堅牢なインフラ構築まで、設計・実装・運用を一貫して担い、長く愛されるサービスを形にします。"
    },
    about: {
        title: "About Me",
        content: "大学で情報工学を専攻し、現在はNode.jsやAWSを中心に学習しています。カレンダーアプリの開発やインフラ構築を通じて、ユーザーに価値を届けるものづくりを目指しています。",
        goals: "AWS認定資格の取得と、フルスタックな開発スキルの習得を目標としています。"
    },
    skills: [
        { name: "HTML/CSS", level: "Advanced", icon: "html-icon" },
        { name: "JavaScript", level: "Advanced", icon: "js-icon" },
        { name: "Node.js", level: "Intermediate", icon: "node-icon" },
        { name: "AWS", level: "Intermediate", icon: "aws-icon" }
    ],
    works: [
        {
            title: "Calendar App",
            description: "Renderにデプロイ済みのカレンダーWebアプリケーション。",
            tech: ["Node.js", "Render", "JavaScript"],
            link: "https://calendar-app-0kon.onrender.com",
            image: "./assets/images/works/calendar.jpg"
        },
        {
            title: "Portfolio Site",
            description: "現在閲覧しているポートフォリオサイト。Web Componentsを採用。",
            tech: ["HTML", "CSS", "JS", "Web Components"],
            link: "#",
            image: "./assets/images/works/portfolio.jpg"
        }
    ],
    profile: {
        name: "オビ　リンタロウ",
        job: "フルスタックエンジニア"
    },
};