import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Star, Award, TrendingUp } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string | null;
  class_level: string;
  year: number;
  image_url: string | null;
  is_featured: boolean;
}

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('year', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Error fetching achievements:', error);
      } else {
        setAchievements(data || []);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getClassBadgeColor = (classLevel: string) => {
    switch (classLevel) {
      case '10':
        return 'bg-primary/10 text-primary border-primary/20';
      case '12':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'both':
        return 'bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getIconByIndex = (index: number) => {
    const icons = [Trophy, Star, Award, TrendingUp];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  if (loading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 space-y-4">
                  <div className="w-12 h-12 bg-muted rounded-lg"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Our Achievements
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Celebrating our students' excellence in academics and their outstanding accomplishments
          </p>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = getIconByIndex(index);
              return (
                <div
                  key={achievement.id}
                  className="card-elevated p-6 hover-lift group text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft group-hover:shadow-glow transition-shadow">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getClassBadgeColor(achievement.class_level)}`}>
                        {achievement.class_level === 'both' ? 'Class 10 & 12' : `Class ${achievement.class_level}`}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>

                    <div className="text-sm text-muted-foreground font-medium">
                      {achievement.year}
                    </div>

                    {achievement.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    )}

                    {achievement.is_featured && (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center space-x-1 text-xs font-medium text-primary">
                          <Star className="h-3 w-3 fill-current" />
                          <span>Featured</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 fade-in">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Achievements Coming Soon</h3>
            <p className="text-muted-foreground">
              We're preparing to showcase our students' remarkable achievements. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}