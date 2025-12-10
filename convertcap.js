

const vttText = `
00:00:11.000 --> 00:00:13.000
Arriving in Morocco felt like a dream. 

00:00:13.000 --> 00:00:26.000
An oasis of peace, food and rest. 
I remember being so happy. So proud. I’d crossed the Sahara, man! If I could do that, I could do anything. 

00:00:26.000 --> 00:00:35.000
It was wonderful to meet other travellers. There were all kinds of birds stopping in Morocco. Geese, cuckoos, swallows. 

00:00:35.000 --> 00:00:42.000
We came from all over Africa. We all had different reasons to be here; we would have never talked to each other before. 

00:00:42.000 --> 00:00:49.000
But the crossing had brought all us migrants together, suddenly making us feel like family. 

00:00:49.000 --> 00:00:56.000
And then, one day, in the middle of that menagerie, I met Banjoko. 

00:00:56.000 --> 00:01:02.000
The first time I saw him, I felt I was looking at myself in a pool of water. I was stunned. 

00:01:02.000 --> 00:01:07.000
Then I stepped closer, and so did he. 

00:01:07.000 --> 00:01:10.000
“Hi”, I said. 

00:01:10.000 --> 00:01:14.000
How could I explain this? I felt like I knew him. 

00:01:14.000 --> 00:01:18.000
When you meet birds from your own species far from home, you just click. 

00:01:18.000 --> 00:01:27.000
The world around is so unsettling, so unfamiliar, that you can feel an instant connection to total strangers.  

00:01:27.000 --> 00:01:29.000
“Hi Bird”, he replied.

00:01:29.000 --> 00:01:32.000
“I’m Mawusi”, I said. 

00:01:32.000 --> 00:01:39.000
“Sweet. I’m Banjoko, but I got used to people calling me Bird. Nobody could pronounce my actual name.” 

00:01:39.000 --> 00:01:46.000
“So you already went to Europe, then?” 
“I did, once, last spring. You’ll see, you’ll never be the same after that. 

00:01:46.000 --> 00:01:51.000
It’s hard to be in a place where nobody understands your name, where you are from or what you are. 

00:01:51.000 --> 00:01:58.000
Where nobody can tell whether you are a swallow, a sand martin or a willow warbler. To them it’s all the same, to them you are just another bird.”

00:01:58.000 --> 00:02:05.000
I didn’t reply. He smiled.

00:02:05.000 --> 00:02:13.000
“Don’t worry, there are good things too. And it’s easier when you travel in good company. So… would you like to join me, Bird?”


`
function srtToCues(srt) {
    const blocks = srt.trim().split(/\n\s*\n+/);
  
    return blocks.map(block => {
      const lines = block.split(/\n+/);
      const timeLine = lines[1].trim();
  
      // Ensure all commas in timestamps become decimal points
      const normalized = timeLine.replace(/,/g, "."); 
  
      const [startStr, endStr] = normalized.split(" --> ");
  
      const toSeconds = t => {
        const [h, m, s] = t.split(":").map(Number);
        return +(h * 3600 + m * 60 + s).toFixed(3);
      };
  
      const start = toSeconds(startStr);
      const end = toSeconds(endStr);
  
      const text = lines.slice(2).join(" ").replace(/\s+/g, " ").replace(/"/g, '\\"');
  
      return `[${start},${end},"${text}"]`;
    }).join(",\n");
  }
  
  // Example usage (paste an SRT string in place of `srtText`)
//   console.log(srtToCues(srtCap));


function vttToCues(vtt) {
    const blocks = vtt.trim().split(/\n\s*\n+/);
  
    function toSeconds(time) {
      // format HH:MM:SS.mmm
      const [h, m, s] = time.split(":");
      return (Number(h) * 3600) + (Number(m) * 60) + Number(s);
    }
  
    function formatSeconds(sec) {
      // force exactly 3 decimal places
      return sec.toFixed(3);
    }
  
    return blocks.map(block => {
      const lines = block.split(/\n/).filter(Boolean);
  
      // WebVTT sometimes includes or omits an index line
      const timeLine = lines[0].includes("-->") ? lines[0] : lines[1];
      const textLines = lines[0].includes("-->") ? lines.slice(1) : lines.slice(2);
  
      const [startStr, endStr] = timeLine.replace(/,/g, ".").split(" --> ");
  
      const start = formatSeconds(toSeconds(startStr));
      const end = formatSeconds(toSeconds(endStr));
  
      const text = textLines.join(" ").trim().replace(/\s+/g, " ").replace(/"/g, '\\"');
  
      return `[${start},${end},"${text}"]`;
    }).join(",\n");
  }
  
  
  // EXAMPLE: paste your VTT into `vttText` and run:
  console.log(vttToCues(vttText));