package dataprocessing;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.cybozu.labs.langdetect.Detector;
import com.cybozu.labs.langdetect.DetectorFactory;
import com.cybozu.labs.langdetect.LangDetectException;

import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.core.StopFilter;
import org.apache.lucene.analysis.pt.PortugueseAnalyzer;
import org.apache.lucene.analysis.pt.PortugueseLightStemFilter;
import org.apache.lucene.analysis.pt.PortugueseMinimalStemFilter;
import org.apache.lucene.analysis.pt.PortugueseStemFilter;
import org.apache.lucene.analysis.standard.StandardTokenizer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.util.Version;

public class TextProcessing {

	public TextProcessing() throws LangDetectException {
		DetectorFactory
				.loadProfile("C:\\Users\\João\\workspace\\TweeProfiles\\profiles");
	}

	public String processText(String text) {
		String lang = null;
		String res = "";
		try {
			lang = detectLanguage(text);
			if (lang.equals("pt")) {
				text = removeURL(text);
				text = removePunctuation(text);
				res = processPortuguese(text);
				
			}
			
		} catch (LangDetectException e) {
			e.printStackTrace();
		}
		return res;
	}

	public String detectLanguage(String text) throws LangDetectException {
		Detector detector = DetectorFactory.create();
		detector.append(text);
		return detector.detect();
	}

	public String removePunctuation(String text) {
		StringBuilder builder = new StringBuilder();
		for (char c : text.toCharArray())
			if (Character.isLetterOrDigit(c))
				builder.append(Character.isLowerCase(c) ? c : Character
						.toLowerCase(c));
			else
				builder.append(' ');
		return builder.toString();
	}

	public String removeURL(String text) {
		String urlPattern = "((https?|http):((//)|(\\\\))+[\\w\\d:#@%/;$~_?\\+-=\\\\\\.&)(]*)";
		// String urlPattern =
		// "((https?|http):((//)|(\\\\))+[-a-zA-Z0-9+&$@#/%?=~_!:,.;\\()]*)";
		Pattern p = Pattern.compile(urlPattern, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(text);
		int i = 0;
		while (m.find()) {
			try{
			text = text.replaceAll(m.group(i), "").trim();
			i++;
			} catch(java.util.regex.PatternSyntaxException e ){
				return "";
			}
		}
		return text;
	}

	public String processPortuguese(String text) {
		// PortugueseAnalyzer ptAnalyser = new
		// PortugueseAnalyzer(Version.LUCENE_48);
		StringBuilder builder = new StringBuilder();
		try {
			// TokenStream tokens = ptAnalyser.tokenStream("text", text);
			TokenStream tokens = new StandardTokenizer(Version.LUCENE_48,
					new StringReader(text));
			CharTermAttribute cattr = tokens
					.addAttribute(CharTermAttribute.class);
			// Stopword removal
			tokens = new StopFilter(Version.LUCENE_48, tokens,
					PortugueseAnalyzer.getDefaultStopSet());

			// Stemming
			// tokens = new PortugueseStemFilter(tokens);
			//tokens = new PortugueseLightStemFilter(tokens);
			 tokens = new PortugueseMinimalStemFilter(tokens);
			tokens.reset();
			while (tokens.incrementToken()) {
				builder.append(cattr.toString() + " ");
			}
			tokens.end();
			tokens.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// ptAnalyser.close();
		return builder.toString();
	}

	/*
	 * private String processBrazilian(String text){ return ""; }
	 */
	/*
	 * private String processSpanish(String text){ return ""; }
	 */

	public static HashMap<String, Double> getCountMap(String input) {
		HashMap<String, Double> count = new HashMap<String, Double>();
		String[] tokens = input.split(" ");
		for (String s : tokens) {
			if (count.containsKey(s))
				count.put(s, count.get(s) + 1.0);
			else
				count.put(s, 1.0);
		}
		return count;
	}

	public static HashMap<String, Double> getTfMap(String input) {
		HashMap<String, Double> count = new HashMap<String, Double>();
		String[] tokens = input.split(" ");
		int len = tokens.length;
		for (String s : tokens) {
			if (count.containsKey(s))
				count.put(s, count.get(s) + 1.0 / len);
			else
				count.put(s, 1.0 / len);
		}
		return count;
	}

}
