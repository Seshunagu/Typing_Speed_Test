const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
const paragraphs = [
    "Law enforcement and criminal justice authorities are increasingly using artificial intelligence (AI) and automated decision-making (ADM) systems. These systems are often used to profile people, ‘predict’ their actions, and assess their risk of certain behaviour, such as committing a crime, in the future. This can have devastating consequences for the people involved, who are profiled as criminals or considered a risk even though they haven’t actually committed a crime.",
   "Predictive policing is no longer confined to the realms of science fiction. These systems are being used by law enforcement around the world. And predictions, profiles, and risk assessments that are based on data analysis, algorithms and AI, often lead to real criminal justice outcomes. These can include constant surveillance, repeated stop and searches, questioning, fines and arrests. These systems can also heavily influence sentencing, prosecution and probation decisions.",
    "Law enforcement agencies are increasingly using artificial intelligence, algorithms and big data to profile people and ‘predict’ whether they are likely to commit a crime. Predictive policing has been proven time and time again to reinforce discrimination and undermine fundamental rights, including the right to a fair trial and the presumption of innocence. This results in Black people, Roma, and other minoritised ethnic people being overpoliced and disproportionately detained and imprisoned across Europe.",
    "As the hype around AI has accelerated, vendors have been scrambling to promote how their products and services use it. Often, what they refer to as AI is simply a component of the technology, such as machine learning. AI requires a foundation of specialized hardware and software for writing and training machine learning algorithms. No single programming language is synonymous with AI, but Python, R, Java, C++ and Julia have features popular with AI developers.",
    "Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of human beings or animals. AI applications include advanced web search engines (e.g., Google Search), recommendation systems (used by YouTube, Amazon, and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Waymo), generative or creative tools (ChatGPT and AI art), and competing at the highest level in strategic games (such as chess and Go).[1]",

"Artificial intelligence was founded as an academic discipline in 1956.[2] The field went through multiple cycles of optimism[3][4] followed by disappointment and loss of funding,[5][6] but after 2012, when deep learning surpassed all previous AI techniques,[7] there was a vast increase in funding and interest.",

"The various sub-fields of AI research are centered around particular goals and the use of particular tools. The traditional goals of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception, and support for robotics.[a] General intelligence (the ability to solve an arbitrary problem) is among the field's long-term goals.[8] To solve these problems, AI researchers have adapted and integrated a wide range of problem-solving techniques, including search and mathematical optimization, formal logic, artificial neural networks, and methods based on statistics, probability, and economics.[b] AI also draws upon psychology, linguistics, philosophy, neuroscience and many other fields.[9]",

"The general problem of simulating (or creating) intelligence has been broken down into sub-problems. These consist of particular traits or capabilities that researchers expect an intelligent system to display. The traits described below have received the most attention and cover the scope of AI research.",

"Early researchers developed algorithms that imitated step-by-step reasoning that humans use when they solve puzzles or make logical deductions.[10] By the late 1980s and 1990s, methods were developed for dealing with uncertain or incomplete information, employing concepts from probability and economics.",

"Many of these algorithms are insufficient for solving large reasoning problems because they experience a combinatorial explosion: they became exponentially slower as the problems grew larger.[12] Even humans rarely use the step-by-step deduction that early AI research could model. They solve most of their problems using fast, intuitive judgments.[13] Accurate and efficient reasoning is an unsolved problem.",

"An ontology represents knowledge as a set of concepts within a domain and the relationships between those concepts.The digital revolution has already changed how people live, work, and communicate. And it’s only just getting started. But the same technologies that have the potential to help billions of people live happier, healthier, and more productive lives are also creating new challenges for citizens and governments around the world. From election meddling to data breaches and cyberattacks, recent events have shown that technology is changing how we think about privacy, national security, and maybe even democracy itself. In this project, we examine challenges in five key areas that will shape the future of the digital age: justice system, impact on democracy, global security and international conflict, the impact of automations and AI on the jobs marketplace, identity, and privacy. Explore provocative and through-provoking topics on how technology impacts our lives",
"Knowledge representation and knowledge engineering[14] allow AI programs to answer questions intelligently and make deductions about real-world facts. Formal knowledge representations are used in content-based indexing and retrieval,[15] scene interpretation,[16] clinical decision support,[17] knowledge discovery (mining interesting  and actionable inferences from large databases),[18] and other areas.[19]",

"A knowledge base is a body of knowledge represented in a form that can be used by a program. An ontology is the set of objects, relations, concepts, and properties used by domain of knowledge.[20] The most general ontologies are called upper ontologies, which attempt to provide a foundation for all other knowledge and act as mediators between domain ontologies that cover specific knowledge about a particular domain (field of interest or area of concern).",

"Knowledge bases need to represent things such as: objects, properties, categories and relations between objects; [21] situations, events, states and time;[22] causes and effects;[23] knowledge about knowledge (what we know about what other people know);[24] default reasoning (things that humans assume are true until they are told differently and will remain true even when other facts are changing);[25] and many other aspects and domains of knowledge.",

"Among the most difficult problems in KR are: the breadth of commonsense knowledge (the set of atomic facts that the average person knows) is enormous;[26] the difficulty of knowledge acquisition and the sub-symbolic form of most commonsense knowledge (much of what people know is not represented as facts or  statements that they could express verbally).",
];

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);