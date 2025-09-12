import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/school-hero.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-subtle-gradient">
      <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
      <div className="container-custom section-padding relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="text-hero text-gradient">
                Welcome to
                <br />
                <span className="block">Saraswati School</span>
              </h1>
              <p className="text-subtitle max-w-lg">
                Nurturing young minds with excellence in education, character building, 
                and holistic development for over two decades.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/events">
                <Button className="btn-hero group">
                  Explore Our Events
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="btn-outline-primary">
                  Get in Touch
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/20">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary">25+</div>
                <div className="text-sm text-muted-foreground">Teachers</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          </div>

          <div className="relative slide-up">
            <div className="relative">
              <img
                src={heroImage}
                alt="Saraswati School Campus"
                className="w-full h-[500px] object-cover rounded-2xl shadow-large"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-medium border border-border/50 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">Excellence Award</div>
                  <div className="text-sm text-muted-foreground">State Recognition 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}