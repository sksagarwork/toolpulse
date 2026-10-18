import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { getFreedomLadderMilestones, formatCurrency } from '../../utils/calculations';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  Flame,
  Plus,
  Trash2,
  Award,
  Zap,
  BookOpen,
  Target,
} from 'lucide-react';
import { WealthHabit } from '../../types/finance';

export const ActionRoadmapTab: React.FC = () => {
  const { state, toggleHabit, addHabit, deleteHabit } = useFinance();
  const milestones = getFreedomLadderMilestones(state);

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [habitTitle, setHabitTitle] = useState('');
  const [habitCategory, setHabitCategory] = useState<WealthHabit['category']>('investing');
  const [habitFrequency, setHabitFrequency] = useState<WealthHabit['frequency']>('daily');
  const [habitImpact, setHabitImpact] = useState<1 | 2 | 3>(3);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#14b8a6', '#3b82f6', '#f59e0b'],
    });
  };

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitTitle) return;
    addHabit({
      title: habitTitle,
      category: habitCategory,
      frequency: habitFrequency,
      completed: false,
      impactScore: habitImpact,
    });
    setHabitTitle('');
    setShowAddHabit(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <Award className="w-6 h-6 text-amber-400" />
          <span>The 7 Stages of Financial Freedom & Daily Execution</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Financial freedom is not a vague fantasy—it is a ladder of 7 concrete mathematical milestones achieved through consistent daily leverage.
        </p>
      </div>

      {/* The 7 Stages of the Freedom Ladder */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center space-x-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>The Freedom Milestones</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {milestones.map((stage) => {
            return (
              <div
                key={stage.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  stage.isReached
                    ? 'bg-gradient-to-r from-emerald-950/30 to-slate-900 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-900/50 border-slate-800 opacity-90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                        stage.isReached
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {stage.isReached ? <CheckCircle2 className="w-5 h-5" /> : `L${stage.level}`}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-white text-base">{stage.title}</h4>
                        <span className="text-xs text-slate-400 hidden sm:inline">• {stage.tagline}</span>
                        {stage.isReached && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            UNLOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 max-w-2xl">{stage.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                        Formula / Target
                      </span>
                      <span className="text-xs font-semibold text-slate-300">
                        {stage.targetAmount > 0 ? formatCurrency(stage.targetAmount, state.currency) : stage.thresholdFormula}
                      </span>
                    </div>

                    {stage.isReached ? (
                      <button
                        onClick={triggerCelebration}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center space-x-1"
                        title="Celebrate!"
                      >
                        <span>🎉 Celebrate</span>
                      </button>
                    ) : (
                      <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily High-Leverage Wealth Habits */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>High-Leverage Wealth Habits & Accountability</span>
            </h3>
            <p className="text-xs text-slate-400">
              Wealth is an emergent consequence of daily non-negotiable systems and ruthless avoidance of lifestyle inflation.
            </p>
          </div>
          <button
            onClick={() => setShowAddHabit(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Habit</span>
          </button>
        </div>

        {/* Form to add habit */}
        {showAddHabit && (
          <form onSubmit={handleCreateHabit} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">New Wealth Habit</h4>
            <input
              type="text"
              placeholder="Habit Description (e.g. Dollar-cost average $200 every Monday)"
              value={habitTitle}
              onChange={(e) => setHabitTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              required
            />
            <div className="grid grid-cols-3 gap-2">
              <select
                value={habitCategory}
                onChange={(e) => setHabitCategory(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
              >
                <option value="investing">Investing</option>
                <option value="income">Income / Leverage</option>
                <option value="savings">Savings / Frugality</option>
                <option value="mindset">Mindset / Knowledge</option>
                <option value="tax">Tax Optimization</option>
              </select>
              <select
                value={habitFrequency}
                onChange={(e) => setHabitFrequency(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <select
                value={habitImpact}
                onChange={(e) => setHabitImpact(parseInt(e.target.value) as any)}
                className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
              >
                <option value="1">1★ Normal Habit</option>
                <option value="2">2★ High Impact</option>
                <option value="3">3★ Life-Changing Lever</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddHabit(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-emerald-500 text-xs text-slate-950 font-bold hover:bg-emerald-400"
              >
                Save Habit
              </button>
            </div>
          </form>
        )}

        {/* Habit List */}
        <div className="space-y-2">
          {state.habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                habit.completed
                  ? 'bg-emerald-950/15 border-emerald-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    toggleHabit(habit.id);
                    if (!habit.completed) triggerCelebration();
                  }}
                  className={`p-1 rounded-lg transition ${
                    habit.completed ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-600 hover:text-slate-400'
                  }`}
                >
                  {habit.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>

                <div>
                  <span
                    className={`text-sm font-medium block ${
                      habit.completed ? 'text-slate-300 line-through opacity-80' : 'text-white'
                    }`}
                  >
                    {habit.title}
                  </span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
                      {habit.frequency}
                    </span>
                    <span className="text-[10px] text-teal-400 capitalize font-medium">
                      {habit.category}
                    </span>
                    <span className="text-[10px] text-amber-400">
                      {'★'.repeat(habit.impactScore)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-bold text-white">{habit.streak} streak</span>
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 4 Immutable Laws of Wealth Multiplier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Law 1: Asymmetric Leverage</span>
          </div>
          <h4 className="text-sm font-bold text-white">Earn with your mind and code/media, not your hours.</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Trading labor for an hourly wage has a hard ceiling of 24 hours a day. Building digital assets, software, or index investments creates permissionless leverage that works for you 24/7/365 while you sleep.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Law 2: The Savings Rate Multiplier</span>
          </div>
          <h4 className="text-sm font-bold text-white">Freedom is determined by your savings rate, not income.</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            A person making $80,000 saving 50% reaches financial freedom in 16.6 years. A person making $500,000 saving 10% requires 51 years. The gap between your income and living expenses is your true freedom engine.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Law 3: Unbreakable Runway</span>
          </div>
          <h4 className="text-sm font-bold text-white">Never be a forced seller during economic storms.</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Keeping 6 months of living expenses in high-yield liquid cash ensures you never panic-sell index investments during market corrections, allowing compounding to compound uninterrupted.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Law 4: The 4% Rule & Trinity Study</span>
          </div>
          <h4 className="text-sm font-bold text-white">25x annual expenses provides perpetual independence.</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            When invested in a 75/25 or 100% total stock market index, drawing down 3.5% to 4.0% per year historically survived 100% of 30-year retirement windows across all world wars, stagflations, and depressions.
          </p>
        </div>
      </div>
    </div>
  );
};
