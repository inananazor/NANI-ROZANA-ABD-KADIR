import React, { useState } from 'react';
import { X, BookOpen, Star, Sparkles, CheckCircle2, Lightbulb, Compass, Award } from 'lucide-react';

interface ReviewGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewGuideModal: React.FC<ReviewGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'hooks' | 'vocabulary' | 'rubric'>('structure');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                SPM Review Writing Masterclass
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>CEFR B1–B2 Level</span>
                <span aria-hidden="true">·</span>
                <span>Part 3 Extended Writing Guide</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'structure'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            4-Part Structure
          </button>
          <button
            onClick={() => setActiveTab('hooks')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'hooks'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Catchy Hooks
          </button>
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'vocabulary'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-4 h-4" />
            B1 → B2 Vocabulary
          </button>
          <button
            onClick={() => setActiveTab('rubric')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'rubric'
                ? 'border-cyan-400 text-cyan-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Exam Scoring Rubric
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {activeTab === 'structure' && (
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                An SPM Part 3 review requires a lively, semi-formal tone that evaluates a movie, book, cafe, gadget, or place. Follow this four-part formula:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 font-bold text-cyan-400 mb-1">
                    <span className="text-sm font-mono text-cyan-500">01.</span>
                    <span>Introduction &amp; Hook</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Catchy title + immediate hook (rhetorical question, problem statement, or vivid scene) + subject identity.
                  </p>
                  <div className="text-xs bg-slate-900/80 p-2.5 rounded border border-slate-800 text-slate-200 italic">
                    &ldquo;Tired of overpriced cafes with tepid coffee? Tucked away in Bangsar, The Roasted Bean is a breath of fresh air.&rdquo;
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 font-bold text-purple-400 mb-1">
                    <span className="text-sm font-mono text-purple-500">02.</span>
                    <span>Description / Background</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Key features, ambience, genre, location, or plot premise without spoiling the story!
                  </p>
                  <div className="text-xs bg-slate-900/80 p-2.5 rounded border border-slate-800 text-slate-200 italic">
                    &ldquo;Adorned with rustic brickwork and leafy hanging ferns, the cafe serves single-origin roasts alongside freshly baked pastries.&rdquo;
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 font-bold text-amber-400 mb-1">
                    <span className="text-sm font-mono text-amber-500">03.</span>
                    <span>Opinions &amp; Supporting Reasons</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Balanced critical evaluation: specific highlights (taste, acting, battery) paired with minor drawbacks.
                  </p>
                  <div className="text-xs bg-slate-900/80 p-2.5 rounded border border-slate-800 text-slate-200 italic">
                    &ldquo;The salted caramel tart had a velvety texture, though the weekend queue tested my patience with a 30-minute wait.&rdquo;
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
                    <span className="text-sm font-mono text-emerald-500">04.</span>
                    <span>Recommendation &amp; Rating</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Star rating (out of 5) + clear target audience advice + practical visiting tips.
                  </p>
                  <div className="text-xs bg-slate-900/80 p-2.5 rounded border border-slate-800 text-slate-200 italic">
                    &ldquo;Scoring a solid 4.5/5 stars, this cafe comes wholeheartedly recommended for coffee enthusiasts and students seeking a study haven.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hooks' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>3 Powerful Ways to Hook Your Reader in Paragraph 1</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
                  <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">
                    1. Rhetorical Question Hook
                  </span>
                  <p className="text-xs text-slate-300">
                    Stimulates curiosity by making the reader imagine an exciting dilemma or sensory pleasure.
                  </p>
                  <p className="text-xs text-slate-400 font-mono bg-slate-900/90 p-2 rounded">
                    &ldquo;Have you ever wondered what would happen if time travel fell into the wrong hands?&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
                  <span className="text-xs font-bold text-purple-400 tracking-wide uppercase">
                    2. Relatable Problem Statement
                  </span>
                  <p className="text-xs text-slate-300">
                    Connects with universal frustrations (e.g. noisy study spots, brittle cables, generic movies) and positions the subject as the solution.
                  </p>
                  <p className="text-xs text-slate-400 font-mono bg-slate-900/90 p-2 rounded">
                    &ldquo;Finding a tranquil study spot with reliable Wi-Fi in the city center often feels like an impossible quest.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                    3. Vivid Sensory Scene Opener
                  </span>
                  <p className="text-xs text-slate-300">
                    Paints sights, sounds, or aromas that transport the reader directly into the experience.
                  </p>
                  <p className="text-xs text-slate-400 font-mono bg-slate-900/90 p-2 rounded">
                    &ldquo;Imagine waking up to the gentle chorus of hornbills and the crisp, mist-scented breeze of an ancient rainforest.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Replace overused baseline words with CEFR B2 adjectives to boost your Language and Communicative Achievement marks:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4">Basic Word (A2/B1)</th>
                      <th className="py-2.5 px-4 text-emerald-400">Sophisticated B2 Upgrade</th>
                      <th className="py-2.5 px-4">Example in Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-2.5 px-4 line-through text-slate-500">Very good / Nice</td>
                      <td className="py-2.5 px-4 font-semibold text-emerald-400">Breathtaking / Impeccable / Exemplary</td>
                      <td className="py-2.5 px-4 text-slate-400">&ldquo;The cliffside offered a breathtaking panorama.&rdquo;</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 line-through text-slate-500">Delicious</td>
                      <td className="py-2.5 px-4 font-semibold text-emerald-400">Melt-in-the-mouth / Delectable / Succulent</td>
                      <td className="py-2.5 px-4 text-slate-400">&ldquo;The smoked brisket had a melt-in-the-mouth texture.&rdquo;</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 line-through text-slate-500">Bad / Poor</td>
                      <td className="py-2.5 px-4 font-semibold text-rose-400">Subpar / Disappointing / Underwhelming</td>
                      <td className="py-2.5 px-4 text-slate-400">&ldquo;The audio mixing was sorely disappointing.&rdquo;</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 line-through text-slate-500">Slow service</td>
                      <td className="py-2.5 px-4 font-semibold text-rose-400">Sluggish service / Protracted wait</td>
                      <td className="py-2.5 px-4 text-slate-400">&ldquo;Patrons suffered through sluggish service.&rdquo;</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 line-through text-slate-500">Cheap / Worth it</td>
                      <td className="py-2.5 px-4 font-semibold text-cyan-400">Value for money / Worth every single penny</td>
                      <td className="py-2.5 px-4 text-slate-400">&ldquo;At RM25, the set lunch was worth every single penny.&rdquo;</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 line-through text-slate-500">You must watch</td>
                      <td className="py-2.5 px-4 font-semibold text-purple-400">An absolute must-watch / Unmissable</td>
                      <td className="py-2.5 px-4 text-slate-400">&ldquo;This thriller is an absolute must-watch on IMAX.&rdquo;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rubric' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-xs">Content (5 Marks)</h4>
                  <p className="text-xs text-slate-400">
                    All prompt requirements addressed fully. Name of venue/film/gadget stated, features described, positive and negative opinions provided, and recommendation clearly stated.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-xs">Communicative Achievement (5 Marks)</h4>
                  <p className="text-xs text-slate-400">
                    Consistent semi-formal review register. Engaging tone that hooks the target reader, shares personal experience, and expresses enthusiasm or constructive critique.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-xs">Organisation (5 Marks)</h4>
                  <p className="text-xs text-slate-400">
                    Well-structured paragraphs (Introduction, Description, Opinion, Recommendation). Smooth cohesive devices (e.g., &ldquo;What struck me most was&rdquo;, &ldquo;All things considered&rdquo;).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-xs">Language (5 Marks)</h4>
                  <p className="text-xs text-slate-400">
                    Rich range of evaluative vocabulary (&ldquo;exceeded my expectations&rdquo;, &ldquo;steep learning curve&rdquo;, &ldquo;picturesque&rdquo;). Good control of complex sentence structures.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950/70 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg"
          >
            Ready to Play!
          </button>
        </div>
      </div>
    </div>
  );
};
