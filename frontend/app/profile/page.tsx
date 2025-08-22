"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const profiles = [
    {
      id: 1,
      name: "Mekin Jemal",
      type: "Job Seeker",
      avatar: "https://ui-avatars.com/api/?name=Mekin+Jemal",
    },
    {
      id: 2,
      name: "Mekin Jemal",
      type: "Private Client",
      avatar: "https://ui-avatars.com/api/?name=Mekin+Jemal",
    },
  ];

  const handleSelectProfile = (id: number) => {
    // Redirect based on profile selection
    if (id === 1) {
      router.push("/dashboard/job-seeker");
    } else {
      router.push("/dashboard/client");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Choose your Profile</h1>
      <p className="text-muted-foreground mb-6">
        Here are a list of profiles you have created. You can choose the profile
        you want to post jobs to or look for work.
      </p>

      <div className="space-y-4">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => handleSelectProfile(profile.id)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.type}</p>
              </div>
            </CardHeader>
          </Card>
        ))}

        <Card className="flex items-center justify-center h-24 border-dashed cursor-pointer hover:shadow-md transition">
          <CardContent className="flex flex-col items-center justify-center">
            <Button variant="outline">Add Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
