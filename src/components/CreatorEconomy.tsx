import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Star, Award } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "15-30%", label: "Commission Rate" },
  { icon: Users, value: "10K+", label: "Active Creators" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: Award, value: "50+", label: "Countries" }
];

const CreatorEconomy = () => {
  return (
    <section id="creators" className="py-24 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Turn Your Travel Passion Into 
              <span className="block bg-gradient-creator bg-clip-text text-transparent">
                Passive Income
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of creators earning from their travel expertise. Share your unique itineraries 
              and earn commissions every time someone books your recommendations.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-creator p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Earn While You Sleep</h4>
                  <p className="text-muted-foreground">Get paid every time someone books your itinerary</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-creator p-2 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Build Your Following</h4>
                  <p className="text-muted-foreground">Gain loyal fans who trust your travel recommendations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-creator p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Climb the Leaderboard</h4>
                  <p className="text-muted-foreground">Compete globally for the best travel packages</p>
                </div>
              </div>
            </div>

            <Button variant="creator" size="default" className="px-6 py-3">
              Start Creating Today
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="p-8 bg-white border-border shadow-card">
              <h3 className="text-2xl font-bold text-foreground mb-6">Creator Success</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-creator/10 p-3 rounded-xl w-fit mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-creator text-white shadow-premium">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Top Creator This Month</div>
                  <div className="text-white/80 text-sm">Sarah's Tokyo Adventure</div>
                </div>
              </div>
              <div className="text-2xl font-bold mb-2">$12,450</div>
              <div className="text-white/80 text-sm">Earned from 89 bookings</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorEconomy;