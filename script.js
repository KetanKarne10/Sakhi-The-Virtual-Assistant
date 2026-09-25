const btn=document.querySelector("#btn");
const content=document.querySelector("#content");
const voice=document.querySelector("#voice");

let availableVoices=[];
let currentLanguage="en-IN";

const languages={
    english:"en-IN",
    hindi:"hi-IN",
    kannada:"kn-IN",
    marathi:"mr-IN",
    telugu:"te-IN",
    french:"fr-FR",
    korean:"ko-KR",
    spanish:"es-ES"
};

function loadVoices(){
    availableVoices=window.speechSynthesis.getVoices();
    console.log("Sakhi voices:");
    availableVoices.forEach((v,i)=>console.log(i+" | "+v.name+" | "+v.lang));
}

loadVoices();
window.speechSynthesis.onvoiceschanged=loadVoices;

function findVoice(lang){
    const prefix=lang.split("-")[0];
    const female=[
        "female","woman","girl","heera","neerja","priya",
        "zira","samantha","susan","karen","hazel",
        "amelie","amélie","audrey","monica","paulina","yuna"
    ];
    const male=[
        "male","man","boy","david","mark","ravi","alex",
        "daniel","jorge","juan"
    ];

    let v=availableVoices.find(x=>{
        const n=x.name.toLowerCase();
        const l=x.lang.toLowerCase();
        return l===lang.toLowerCase() &&
            female.some(k=>n.includes(k)) &&
            !male.some(k=>n.includes(k));
    });

    if(v)return v;

    v=availableVoices.find(x=>x.lang.toLowerCase()===lang.toLowerCase());
    if(v)return v;

    v=availableVoices.find(x=>x.lang.toLowerCase().startsWith(prefix));
    if(v)return v;

    return availableVoices.find(x=>{
        const n=x.name.toLowerCase();
        const l=x.lang.toLowerCase();
        return l.startsWith("en") &&
            female.some(k=>n.includes(k)) &&
            !male.some(k=>n.includes(k));
    })||null;
}

function speak(text){
    if(!text)return;

    window.speechSynthesis.cancel();

    const speech=new SpeechSynthesisUtterance(text);
    speech.lang=currentLanguage;
    speech.rate=0.95;
    speech.pitch=1.12;
    speech.volume=1;

    const selectedVoice=findVoice(currentLanguage);

    if(selectedVoice){
        speech.voice=selectedVoice;
        console.log("Sakhi voice:",selectedVoice.name,selectedVoice.lang);
    }else{
        console.warn("No voice found for",currentLanguage);
    }

    window.speechSynthesis.speak(speech);
}

function setLanguage(lang){
    if(!languages[lang])return false;
    currentLanguage=languages[lang];
    console.log("Language:",currentLanguage);
    return true;
}

function response(type){
    const r={
        "en-IN":{
            hello:"Hello! How may I help you?",
            how:"I am doing great! Thank you for asking.",
            who:"I am Sakhi, your multilingual virtual assistant, created by Ketan Karne.",
            name:"My name is Sakhi. I am your virtual assistant.",
            creator:"I was created by Ketan Karne.",
            thanks:"You're welcome! I am always happy to help.",
            bye:"Goodbye! Have a great day.",
            morning:"Good morning! I hope you have a wonderful day.",
            afternoon:"Good afternoon! How may I help you?",
            evening:"Good evening! How may I help you?",
            noSpeech:"I didn't hear anything. Please try again.",
            microphone:"Please allow microphone permission and try again.",
            network:"There is a network problem. Please check your internet connection.",
            error:"Sorry, something went wrong. Please try again."
        },
        "hi-IN":{
            hello:"नमस्ते! मैं आपकी कैसे मदद कर सकती हूँ?",
            how:"मैं बहुत अच्छी हूँ। पूछने के लिए धन्यवाद।",
            who:"मैं सखी हूँ, आपकी बहुभाषी वर्चुअल असिस्टेंट। मुझे केतन कर्णे ने बनाया है।",
            name:"मेरा नाम सखी है। मैं आपकी वर्चुअल असिस्टेंट हूँ।",
            creator:"मुझे केतन कर्णे ने बनाया है।",
            thanks:"आपका स्वागत है। आपकी मदद करके मुझे खुशी होती है।",
            bye:"अलविदा! आपका दिन शुभ हो।",
            morning:"सुप्रभात! आपका दिन बहुत अच्छा रहे।",
            afternoon:"नमस्कार! मैं आपकी कैसे मदद कर सकती हूँ?",
            evening:"शुभ संध्या! मैं आपकी कैसे मदद कर सकती हूँ?",
            noSpeech:"मैं आपकी आवाज़ नहीं सुन पाई। कृपया फिर से बोलें।",
            microphone:"कृपया माइक्रोफ़ोन की अनुमति दें और फिर कोशिश करें।",
            network:"नेटवर्क की समस्या है। कृपया अपना इंटरनेट कनेक्शन जाँचें।",
            error:"माफ़ कीजिए, कुछ समस्या हुई। कृपया फिर से कोशिश करें।"
        },
        "kn-IN":{
            hello:"ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
            how:"ನಾನು ತುಂಬಾ ಚೆನ್ನಾಗಿದ್ದೇನೆ. ಕೇಳಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
            who:"ನಾನು ಸಖಿ, ನಿಮ್ಮ ಬಹುಭಾಷಾ ವರ್ಚುವಲ್ ಅಸಿಸ್ಟೆಂಟ್. ನನ್ನನ್ನು ಕೇತನ್ ಕರ್ಣೆ ಅವರು ರಚಿಸಿದ್ದಾರೆ.",
            name:"ನನ್ನ ಹೆಸರು ಸಖಿ. ನಾನು ನಿಮ್ಮ ವರ್ಚುವಲ್ ಅಸಿಸ್ಟೆಂಟ್.",
            creator:"ನನ್ನನ್ನು ಕೇತನ್ ಕರ್ಣೆ ಅವರು ರಚಿಸಿದ್ದಾರೆ.",
            thanks:"ಸ್ವಾಗತ. ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನನಗೆ ಸಂತೋಷವಾಗಿದೆ.",
            bye:"ವಿದಾಯ! ನಿಮ್ಮ ದಿನ ಶುಭವಾಗಲಿ.",
            morning:"ಶುಭೋದಯ! ನಿಮ್ಮ ದಿನ ಸುಂದರವಾಗಿರಲಿ.",
            afternoon:"ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
            evening:"ಶುಭ ಸಂಜೆ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
            noSpeech:"ನಿಮ್ಮ ಧ್ವನಿ ನನಗೆ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಮಾತನಾಡಿ.",
            microphone:"ದಯವಿಟ್ಟು ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿಯನ್ನು ನೀಡಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
            network:"ನೆಟ್‌ವರ್ಕ್ ಸಮಸ್ಯೆ ಇದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ.",
            error:"ಕ್ಷಮಿಸಿ, ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
        },
        "mr-IN":{
            hello:"नमस्कार! मी तुमची कशी मदत करू शकते?",
            how:"मी खूप छान आहे. विचारल्याबद्दल धन्यवाद.",
            who:"मी सखी आहे, तुमची बहुभाषिक व्हर्च्युअल असिस्टंट. मला केतन कर्णे यांनी तयार केले आहे.",
            name:"माझे नाव सखी आहे. मी तुमची व्हर्च्युअल असिस्टंट आहे.",
            creator:"मला केतन कर्णे यांनी तयार केले आहे.",
            thanks:"तुमचे स्वागत आहे. तुम्हाला मदत करून मला आनंद होतो.",
            bye:"निरोप! तुमचा दिवस छान जावो.",
            morning:"शुभ सकाळ! तुमचा दिवस आनंदी जावो.",
            afternoon:"नमस्कार! मी तुमची कशी मदत करू शकते?",
            evening:"शुभ संध्याकाळ! मी तुमची कशी मदत करू शकते?",
            noSpeech:"मला तुमचा आवाज ऐकू आला नाही. कृपया पुन्हा बोला.",
            microphone:"कृपया मायक्रोफोनची परवानगी द्या आणि पुन्हा प्रयत्न करा.",
            network:"नेटवर्कची समस्या आहे. कृपया तुमचे इंटरनेट कनेक्शन तपासा.",
            error:"माफ करा, काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा."
        },
        "te-IN":{
            hello:"నమస్కారం! నేను మీకు ఎలా సహాయం చేయగలను?",
            how:"నేను చాలా బాగున్నాను. అడిగినందుకు ధన్యవాదాలు.",
            who:"నేను సఖి, మీ బహుభాషా వర్చువల్ అసిస్టెంట్. నన్ను కేతన్ కర్ణే రూపొందించారు.",
            name:"నా పేరు సఖి. నేను మీ వర్చువల్ అసిస్టెంట్‌ని.",
            creator:"నన్ను కేతన్ కర్ణే రూపొందించారు.",
            thanks:"మీకు స్వాగతం. మీకు సహాయం చేయడం నాకు సంతోషంగా ఉంది.",
            bye:"వీడ్కోలు! మీ రోజు మంచిగా ఉండాలి.",
            morning:"శుభోదయం! మీ రోజు ఆనందంగా ఉండాలి.",
            afternoon:"నమస్కారం! నేను మీకు ఎలా సహాయం చేయగలను?",
            evening:"శుభ సాయంత్రం! నేను మీకు ఎలా సహాయం చేయగలను?",
            noSpeech:"మీ మాట నాకు వినిపించలేదు. దయచేసి మళ్లీ మాట్లాడండి.",
            microphone:"దయచేసి మైక్రోఫోన్ అనుమతిని ఇవ్వండి మరియు మళ్లీ ప్రయత్నించండి.",
            network:"నెట్‌వర్క్ సమస్య ఉంది. దయచేసి మీ ఇంటర్నెట్ కనెక్షన్‌ను తనిఖీ చేయండి.",
            error:"క్షమించండి, ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి."
        },
        "fr-FR":{
            hello:"Bonjour ! Comment puis-je vous aider ?",
            how:"Je vais très bien. Merci de demander.",
            who:"Je suis Sakhi, votre assistante virtuelle multilingue, créée par Ketan Karne.",
            name:"Je m'appelle Sakhi. Je suis votre assistante virtuelle.",
            creator:"J'ai été créée par Ketan Karne.",
            thanks:"Je vous en prie. Je suis toujours heureuse de vous aider.",
            bye:"Au revoir ! Passez une excellente journée.",
            morning:"Bonjour ! Je vous souhaite une excellente journée.",
            afternoon:"Bonjour ! Comment puis-je vous aider ?",
            evening:"Bonsoir ! Comment puis-je vous aider ?",
            noSpeech:"Je n'ai rien entendu. Veuillez réessayer.",
            microphone:"Veuillez autoriser le microphone et réessayer.",
            network:"Il y a un problème de réseau. Veuillez vérifier votre connexion Internet.",
            error:"Désolée, une erreur s'est produite. Veuillez réessayer."
        },
        "ko-KR":{
            hello:"안녕하세요! 무엇을 도와드릴까요?",
            how:"저는 아주 잘 지내고 있어요. 물어봐 주셔서 감사합니다.",
            who:"저는 사키입니다. 케탄 카르네가 만든 다국어 가상 비서입니다.",
            name:"제 이름은 사키입니다. 저는 여러분의 가상 비서입니다.",
            creator:"저는 케탄 카르네가 만들었습니다.",
            thanks:"천만에요. 도와드릴 수 있어서 기쁩니다.",
            bye:"안녕히 가세요! 좋은 하루 보내세요.",
            morning:"좋은 아침이에요! 행복한 하루 보내세요.",
            afternoon:"안녕하세요! 무엇을 도와드릴까요?",
            evening:"좋은 저녁이에요! 무엇을 도와드릴까요?",
            noSpeech:"음성을 듣지 못했어요. 다시 말씀해 주세요.",
            microphone:"마이크 권한을 허용한 후 다시 시도해 주세요.",
            network:"네트워크 문제가 있습니다. 인터넷 연결을 확인해 주세요.",
            error:"죄송합니다. 문제가 발생했습니다. 다시 시도해 주세요."
        },
        "es-ES":{
            hello:"¡Hola! ¿Cómo puedo ayudarte?",
            how:"Estoy muy bien. Gracias por preguntar.",
            who:"Soy Sakhi, tu asistente virtual multilingüe, creada por Ketan Karne.",
            name:"Me llamo Sakhi. Soy tu asistente virtual.",
            creator:"Fui creada por Ketan Karne.",
            thanks:"De nada. Siempre estoy feliz de ayudarte.",
            bye:"¡Adiós! Que tengas un buen día.",
            morning:"¡Buenos días! Espero que tengas un día maravilloso.",
            afternoon:"¡Buenas tardes! ¿Cómo puedo ayudarte?",
            evening:"¡Buenas noches! ¿Cómo puedo ayudarte?",
            noSpeech:"No escuché nada. Por favor, inténtalo de nuevo.",
            microphone:"Permite el acceso al micrófono e inténtalo de nuevo.",
            network:"Hay un problema de red. Comprueba tu conexión a Internet.",
            error:"Lo siento, algo salió mal. Inténtalo de nuevo."
        }
    };

    return (r[currentLanguage]&&r[currentLanguage][type])||r["en-IN"][type];
}

function openResponse(site){
    const r={
        "en-IN":"Opening "+site+".",
        "hi-IN":site+" खोल रही हूँ।",
        "kn-IN":site+" ತೆರೆಯುತ್ತಿದ್ದೇನೆ.",
        "mr-IN":site+" उघडत आहे.",
        "te-IN":site+" తెరుస్తున్నాను.",
        "fr-FR":"J'ouvre "+site+".",
        "ko-KR":site+"을 열겠습니다.",
        "es-ES":"Abriendo "+site+"."
    };
    return r[currentLanguage]||r["en-IN"];
}

function timeResponse(time){
    const r={
        "en-IN":"The current time is "+time,
        "hi-IN":"अभी समय है "+time,
        "kn-IN":"ಈಗ ಸಮಯ "+time,
        "mr-IN":"आत्ताची वेळ "+time+" आहे.",
        "te-IN":"ప్రస్తుత సమయం "+time,
        "fr-FR":"Il est actuellement "+time,
        "ko-KR":"현재 시간은 "+time+"입니다.",
        "es-ES":"La hora actual es "+time
    };
    return r[currentLanguage]||r["en-IN"];
}

function dateResponse(date){
    const r={
        "en-IN":"Today is "+date,
        "hi-IN":"आज "+date+" है।",
        "kn-IN":"ಇಂದು "+date,
        "mr-IN":"आज "+date+" आहे.",
        "te-IN":"ఈ రోజు "+date,
        "fr-FR":"Nous sommes "+date,
        "ko-KR":"오늘은 "+date+"입니다.",
        "es-ES":"Hoy es "+date
    };
    return r[currentLanguage]||r["en-IN"];
}

function searchResponse(query){
    const r={
        "en-IN":"Here is what I found on Google regarding "+query,
        "hi-IN":query+" के बारे में Google पर खोज रही हूँ।",
        "kn-IN":query+" ಬಗ್ಗೆ Google ನಲ್ಲಿ ಹುಡುಕುತ್ತಿದ್ದೇನೆ.",
        "mr-IN":query+" बद्दल Google वर शोधत आहे.",
        "te-IN":query+" గురించి Google లో వెతుకుతున్నాను.",
        "fr-FR":"Je recherche "+query+" sur Google.",
        "ko-KR":query+"에 대해 Google에서 검색하고 있습니다.",
        "es-ES":"Estoy buscando "+query+" en Google."
    };
    return r[currentLanguage]||r["en-IN"];
}

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;

if(!SpeechRecognition){
    content.innerText="Speech recognition not supported";
    btn.disabled=true;
    alert("Please use Google Chrome for Sakhi.");
}else{
    const recognition=new SpeechRecognition();

    recognition.continuous=false;
    recognition.interimResults=false;
    recognition.maxAlternatives=1;
    recognition.lang=currentLanguage;

    recognition.onstart=()=>{
        content.innerText="Listening...";
        voice.style.display="block";
        btn.style.display="none";
        console.log("Sakhi listening...");
    };

    recognition.onresult=e=>{
        const transcript=e.results[0][0].transcript.trim();
        console.log("You said:",transcript);
        content.innerText=transcript;
        takeCommand(transcript);
    };

    recognition.onerror=e=>{
        console.error("Speech error:",e.error);
        voice.style.display="none";
        btn.style.display="flex";

        if(e.error==="not-allowed"){
            content.innerText="Allow microphone permission";
            speak(response("microphone"));
        }else if(e.error==="no-speech"){
            content.innerText="I didn't hear you";
            speak(response("noSpeech"));
        }else if(e.error==="audio-capture"){
            content.innerText="Microphone not found";
            speak(response("microphone"));
        }else if(e.error==="network"){
            content.innerText="Network error";
            speak(response("network"));
        }else{
            content.innerText="Please try again";
            speak(response("error"));
        }
    };

    recognition.onend=()=>{
        voice.style.display="none";
        btn.style.display="flex";
    };

    btn.addEventListener("click",()=>{
        try{
            window.speechSynthesis.cancel();
            recognition.lang=currentLanguage;
            recognition.start();
        }catch(e){
            console.error(e);
            voice.style.display="none";
            btn.style.display="flex";
            content.innerText="Click to try again";
        }
    });

    function takeCommand(original){
        const message=original.toLowerCase().trim();

        if(message.includes("speak english")||message.includes("switch to english")){
            setLanguage("english");
            speak("Okay. I will speak in English now.");
            return;
        }

        if(message.includes("speak hindi")||message.includes("switch to hindi")||message.includes("hindi bolo")||message.includes("hindi mein bolo")){
            setLanguage("hindi");
            speak("ठीक है। अब मैं हिंदी में बात करूंगी।");
            return;
        }

        if(message.includes("speak kannada")||message.includes("switch to kannada")||message.includes("kannada maathadu")||message.includes("kannad dalli mathadu")||message.includes("kannad dag maathad")){
            setLanguage("kannada");
            speak("ಸರಿ. ಈಗ ನಾನು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ.");
            return;
        }

        if(message.includes("speak marathi")||message.includes("switch to marathi")||message.includes("marathi bolo")){
            setLanguage("marathi");
            speak("ठीक आहे. आता मी मराठीत बोलेन.");
            return;
        }

        if(message.includes("speak telugu")||message.includes("switch to telugu")){
            setLanguage("telugu");
            speak("సరే. ఇప్పుడు నేను తెలుగులో మాట్లాడతాను.");
            return;
        }

        if(message.includes("speak french")||message.includes("switch to french")){
            setLanguage("french");
            speak("D'accord. Je vais parler français maintenant.");
            return;
        }

        if(message.includes("speak korean")||message.includes("switch to korean")){
            setLanguage("korean");
            speak("알겠습니다. 이제 한국어로 말할게요.");
            return;
        }

        if(message.includes("speak spanish")||message.includes("switch to spanish")){
            setLanguage("spanish");
            speak("De acuerdo. Hablaré en español ahora.");
            return;
        }

        const command=message.replace(/\bsakhi\b/gi,"").trim();

        if(command.includes("hello")||command.includes("hey")||command==="hi"){
            speak(response("hello"));
        }
        else if(command.includes("how are you")||command.includes("how r you")){
            speak(response("how"));
        }
        else if(command.includes("who are you")||command.includes("what are you")){
            speak(response("who"));
        }
        else if(command.includes("what is your name")||command.includes("what's your name")||command.includes("your name")){
            speak(response("name"));
        }
        else if(command.includes("who created you")||command.includes("who made you")||command.includes("who is your creator")){
            speak(response("creator"));
        }
        else if(command.includes("good morning")){
            speak(response("morning"));
        }
        else if(command.includes("good afternoon")){
            speak(response("afternoon"));
        }
        else if(command.includes("good evening")){
            speak(response("evening"));
        }
        else if(command.includes("thank you")||command.includes("thanks")){
            speak(response("thanks"));
        }
        else if(command==="bye"||command.includes("goodbye")){
            speak(response("bye"));
        }
        else if(command.includes("open youtube")||command==="youtube"){
            speak(openResponse("YouTube"));
            window.open("https://www.youtube.com","_blank");
        }
        else if(command.includes("open google")||command==="google"){
            speak(openResponse("Google"));
            window.open("https://www.google.com","_blank");
        }
        else if(command.includes("open facebook")){
            speak(openResponse("Facebook"));
            window.open("https://www.facebook.com","_blank");
        }
        else if(command.includes("open instagram")){
            speak(openResponse("Instagram"));
            window.open("https://www.instagram.com","_blank");
        }
        else if(command.includes("open whatsapp")||command==="whatsapp"){
            speak(openResponse("WhatsApp"));
            window.open("https://web.whatsapp.com","_blank");
        }
        else if(command.includes("open calculator")||command==="calculator"){
            speak(openResponse("calculator"));
            window.open("https://www.google.com/search?q=calculator","_blank");
        }
        else if(command.includes("what time is it")||command.includes("current time")||command==="time"){
            const time=new Date().toLocaleTimeString(currentLanguage,{
                hour:"numeric",
                minute:"numeric",
                hour12:true
            });
            speak(timeResponse(time));
        }
        else if(command.includes("what is today's date")||command.includes("what is the date")||command.includes("today's date")||command==="date"){
            const date=new Date().toLocaleDateString(currentLanguage,{
                weekday:"long",
                day:"numeric",
                month:"long",
                year:"numeric"
            });
            speak(dateResponse(date));
        }
        else if(command.length>0){
            const query=encodeURIComponent(command);
            speak(searchResponse(command));
            window.open("https://www.google.com/search?q="+query,"_blank");
        }else{
            speak(response("error"));
        }
    }
}