import { BookOpen, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t border-border/50">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center shadow-soft">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">Saraswati School</h3>
                <p className="text-sm text-muted-foreground">Excellence in Education</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nurturing young minds with quality education, values, and holistic development 
              for a brighter future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/" },
                { name: "Our Staff", href: "/staff" },
                { name: "Events", href: "/events" },
                { name: "Gallery", href: "/gallery" },
                { name: "News", href: "/news" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Education Street<br />
                  Knowledge City, KC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@saraswatischool.edu</span>
              </li>
            </ul>
          </div>

          {/* School Hours */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">School Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Classes</p>
                  <p>Mon - Fri: 8:00 AM - 3:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Clock className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Office</p>
                  <p>Mon - Fri: 7:30 AM - 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Saraswati School. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/admin"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}