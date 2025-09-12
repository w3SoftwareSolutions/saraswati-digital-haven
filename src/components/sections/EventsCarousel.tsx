import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  image_url: string | null;
  is_featured: boolean;
}

export default function EventsCarousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
        .limit(6);

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-subtle-gradient">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 space-y-4">
                  <div className="h-48 bg-muted rounded-lg"></div>
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
    <section className="section-padding bg-subtle-gradient">
      <div className="container-custom">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Upcoming Events
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Stay updated with our latest school events, activities, and celebrations
          </p>
        </div>

        {events.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {events.slice(0, 3).map((event, index) => (
                <div
                  key={event.id}
                  className="card-elevated p-6 hover-lift group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-primary" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{format(new Date(event.event_date), 'MMM dd, yyyy')}</span>
                      </div>
                      {event.event_time && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span>{event.event_time}</span>
                        </div>
                      )}
                    </div>

                    {event.location && (
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span>{event.location}</span>
                      </div>
                    )}

                    {event.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center fade-in">
              <Link to="/events">
                <Button variant="outline" className="btn-outline-primary group">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 fade-in">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Events Yet</h3>
            <p className="text-muted-foreground mb-6">
              Exciting events are being planned. Check back soon for updates!
            </p>
            <Link to="/contact">
              <Button variant="outline" className="btn-outline-secondary">
                Contact Us for Updates
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}