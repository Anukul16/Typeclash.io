
const paragraphs = [
    "On the outskirts of town, nestled between rolling hills and lush greenery, lies a quaint village with a population of 500 residents. Each morning, the villagers gather in the town square to start their day, exchanging pleasantries and catching up on the latest news. Children play in the streets, their laughter echoing through the narrow cobblestone alleys. The local market bustles with activity as vendors sell fresh produce and handmade goods. Life in the village moves at a leisurely pace, far removed from the hustle and bustle of city life.",

    "In the heart of the forest, a majestic waterfall cascades down a rocky cliff, its waters plunging 100 feet into a crystal-clear pool below. Surrounding the waterfall are towering trees, some reaching heights of 150 feet or more. The air is filled with the sound of rushing water and the sweet melody of birdsong. Hikers and nature enthusiasts flock to the area, drawn by its natural beauty and tranquility. A well-worn trail leads visitors through the dense foliage, offering breathtaking views at every turn.",


    "High atop a snow-capped mountain peak, an expedition team braves freezing temperatures and treacherous terrain in search of a hidden treasure rumored to be buried at an altitude of 10,000 feet. Armed with climbing gear and survival supplies, the team sets out on their perilous journey, navigating icy slopes and crevasses along the way. With each step, they draw closer to their goal, fueled by the promise of adventure and the thrill of discovery. But as night falls and temperatures plummet, they must rely on their wits and teamwork to overcome the challenges that lie ahead."   ,

    "In the year 2023, the global population reached 8.5 billion, marking a significant milestone in human history. Technological advancements continued to accelerate, with AI adoption soaring by 25% in various industries. However, challenges persisted, such as climate change, with carbon emissions rising by 3% despite efforts to curb them. Economies fluctuated, with the GDP of major countries experiencing both growth and contraction. Despite uncertainties, optimism prevailed, driven by innovative solutions and international cooperation aimed at addressing pressing issues facing humanity.",

    "The stock market witnessed unprecedented volatility in 2022, with the S&P 500 index hitting record highs before plunging by 15% in the latter half of the year. Inflation surged to 5%, fueled by supply chain disruptions and rising energy prices. Meanwhile, technological breakthroughs continued unabated, with the development of quantum computing reaching a significant milestone. The global workforce adapted to remote work, with over 60% of employees working from home at least part-time. Despite the challenges, philanthropic efforts surged, with charitable donations reaching $500 billion, addressing crucial societal needs.",
]
let previousParaIndex = 0;

const generateRandomParagraph = (punctuation, numbers, words_list) => {
    let paraIndex;
    
    do {
        paraIndex = Math.floor(Math.random() * paragraphs.length);
    } while (paraIndex === previousParaIndex);

    // console.log("ParaIdx: ",paraIndex);
    previousParaIndex = paraIndex;

    const randomParagraph = paragraphs[paraIndex];
    
    let filteredParagraph = randomParagraph;

    if (punctuation === 'off') {
        filteredParagraph = filteredParagraph.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    }

    if (numbers === 'off') {
        filteredParagraph = filteredParagraph.replace(/[0-9]/g, '');
    }

    if (words_list === 'simple') {
        filteredParagraph = filteredParagraph.toLowerCase();
        
    }

    return filteredParagraph;
};


module.exports=generateRandomParagraph;