// "use client"

// import type React from "react"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/components/ui/use-toast"
// import { useRouter } from "next/navigation"
// import Layout from "@/components/Layout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function InputWebsitePage() {
//   const [websiteLink, setWebsiteLink] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
//     if (!urlPattern.test(websiteLink)) {
//       toast({
//         title: "Invalid URL",
//         description: "Please enter a valid website link.",
//         variant: "destructive",
//       })
//       setIsLoading(false)
//       return
//     }

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 3000))

//     setIsLoading(false)
//     router.push("/confirm-info")
//   }

//   return (
//     <Layout>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Website</h1>
//         <Card>
//           <CardHeader>
//             <CardTitle>Enter Your Website URL</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Input
//                   id="website-link"
//                   type="text"
//                   placeholder="https://example.com"
//                   value={websiteLink}
//                   onChange={(e) => setWebsiteLink(e.target.value)}
//                   className="w-full"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
//                 {isLoading ? "Connecting..." : "Connect Website"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Layout>
//   )
// }


// "use client"

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import Layout from "@/components/Layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { createClient } from "@supabase/supabase-js";

// // Initialize Supabase Client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default function InputWebsitePage() {
//   const [websiteLink, setWebsiteLink] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Log the URL to check if it's being captured
//     console.log("Submitting URL:", websiteLink);

//     // Validate URL format
//     const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
//     if (!urlPattern.test(websiteLink)) {
//       toast({
//         title: "Invalid URL",
//         description: "Please enter a valid website link",
//         variant: "destructive",
//       });
//       setIsLoading(false);
//       return;
//     }

//     // Insert website link into Supabase
//     const { data, error } = await supabase.from("websites").insert([{ url: websiteLink }]);

//     if (error) {
//       console.error("Supabase Insert Error:", error); // Log error if database insert fails
//       toast({
//         title: "Database Error",
//         description: "Failed to save website. Try again",
//         variant: "destructive",
//       });
//       setIsLoading(false);
//       return;
//     }

//     console.log("Successfully inserted:", data); // Log success message

//     setIsLoading(false);
//     router.push("/confirm-info");
//   };

//   return (
//     <Layout>
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Website</h1>
//         <Card>
//           <CardHeader>
//             <CardTitle>Enter Your Website URL</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Input
//                   id="website-link"
//                   type="text"
//                   placeholder="https://example.com"
//                   value={websiteLink}
//                   onChange={(e) => setWebsiteLink(e.target.value)}
//                   className="w-full"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={isLoading}>
//                 {isLoading ? "Connecting..." : "Connect Website"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Layout>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import Layout from "@/components/Layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { createClient } from "@supabase/supabase-js";

// // Initialize Supabase Client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Anon Key:", supabaseAnonKey);
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default function InputWebsitePage() {
//     const [websiteLink, setWebsiteLink] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const { toast } = useToast();
//     const router = useRouter();

//     useEffect(() => {
//         console.log("Component Rendered");
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Form submitted");
//         setIsLoading(true);

//         console.log("Submitting URL:", websiteLink);

//         const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
//         if (!urlPattern.test(websiteLink)) {
//             toast({
//                 title: "Invalid URL",
//                 description: "Please enter a valid website link",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const { data, error } = await supabase
//                 .from("websites")
//                 .insert([{ url: websiteLink }]);

//             if (error) {
//                 console.error("Supabase Insert Error:", error);
//                 console.error("Full Error Object:", JSON.stringify(error, null, 2));
//                 toast({
//                     title: "Database Error",
//                     description: "Failed to save website. Try again",
//                     variant: "destructive",
//                 });
//                 setIsLoading(false);
//                 return;
//             }

//             console.log("Supabase Insert Success:", { data });
//             setIsLoading(false);
//             router.push("/confirm-info");
//         } catch (error) {
//             console.error("Client-Side Error:", error);
//             toast({
//                 title: "Client-Side Error",
//                 description: "An unexpected error occurred.",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Layout>
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Website</h1>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Enter Your Website URL</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="space-y-2">
//                                 <Input
//                                     id="website-link"
//                                     type="text"
//                                     placeholder="https://example.com"
//                                     value={websiteLink}
//                                     onChange={(e) => setWebsiteLink(e.target.value)}
//                                     className="w-full"
//                                     required
//                                 />
//                             </div>
//                             <Button
//                                 type="submit"
//                                 className="w-full bg-blue-500 hover:bg-blue-600 text-white"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Connecting..." : "Connect Website"}
//                             </Button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </Layout>
//     );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import Layout from "@/components/Layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { createClient } from "@supabase/supabase-js";

// export default function InputWebsitePage() {
//     const [websiteLink, setWebsiteLink] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const { toast } = useToast();
//     const router = useRouter();
//     const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);

//     useEffect(() => {
//         console.log("Component Rendered");
//         const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//         const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//         if (supabaseUrl && supabaseAnonKey) {
//             console.log("Supabase URL:", supabaseUrl);
//             console.log("Supabase Anon Key:", supabaseAnonKey);
//             setSupabase(createClient(supabaseUrl, supabaseAnonKey));
//         } else {
//             console.error("Supabase URL or Anon Key is missing");
//             toast({
//                 title: "Configuration Error",
//                 description: "Supabase configuration is missing.",
//                 variant: "destructive",
//             });
//         }

//     }, [toast]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Form submitted");
//         setIsLoading(true);

//         console.log("Submitting URL:", websiteLink);

//         const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
//         if (!urlPattern.test(websiteLink)) {
//             toast({
//                 title: "Invalid URL",
//                 description: "Please enter a valid website link",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//             return;
//         }

//         if(!supabase){
//             toast({
//                 title: "Configuration Error",
//                 description: "Supabase client is not initialized.",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const { data, error } = await supabase
//                 .from("websites")
//                 .insert([{ url: websiteLink }]);

//             if (error) {
//                 console.error("Supabase Insert Error:", error);
//                 console.error("Full Error Object:", JSON.stringify(error, null, 2));
//                 toast({
//                     title: "Database Error",
//                     description: "Failed to save website. Try again",
//                     variant: "destructive",
//                 });
//                 setIsLoading(false);
//                 return;
//             }

//             console.log("Supabase Insert Success:", { data });
//             setIsLoading(false);
//             router.push("/confirm-info");
//         } catch (error) {
//             console.error("Client-Side Error:", error);
//             toast({
//                 title: "Client-Side Error",
//                 description: "An unexpected error occurred.",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Layout>
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Website</h1>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Enter Your Website URL</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="space-y-2">
//                                 <Input
//                                     id="website-link"
//                                     type="text"
//                                     placeholder="https://example.com"
//                                     value={websiteLink}
//                                     onChange={(e) => setWebsiteLink(e.target.value)}
//                                     className="w-full"
//                                     required
//                                 />
//                             </div>
//                             <Button
//                                 type="submit"
//                                 className="w-full bg-blue-500 hover:bg-blue-600 text-white"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Connecting..." : "Connect Website"}
//                             </Button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </Layout>
//     );
// }






// //works
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import Layout from "@/components/Layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { createClient } from "@supabase/supabase-js";

// export default function InputWebsitePage() {
//     const [websiteLink, setWebsiteLink] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const { toast } = useToast();
//     const router = useRouter();
//     const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);
//     const [isSupabaseInitialized, setIsSupabaseInitialized] = useState(false);

//     useEffect(() => {
//         console.log("Component Rendered");
//         const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//         const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//         if (supabaseUrl && supabaseAnonKey) {
//             console.log("Supabase URL:", supabaseUrl);
//             console.log("Supabase Anon Key:", supabaseAnonKey);
//             setSupabase(createClient(supabaseUrl, supabaseAnonKey));
//             setIsSupabaseInitialized(true);
//         } else {
//             console.error("Supabase URL or Anon Key is missing");
//             toast({
//                 title: "Configuration Error",
//                 description: "Supabase configuration is missing.",
//                 variant: "destructive",
//             });
//         }

//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Form submitted");
//         setIsLoading(true);

//         console.log("Submitting URL:", websiteLink);

//         const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
//         if (!urlPattern.test(websiteLink)) {
//             toast({
//                 title: "Invalid URL",
//                 description: "Please enter a valid website link",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//             return;
//         }

//         if(!supabase){
//             toast({
//                 title: "Configuration Error",
//                 description: "Supabase client is not initialized.",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const { data, error } = await supabase
//                 .from("websites")
//                 .insert([{ url: websiteLink }]);

//             if (error) {
//                 console.error("Supabase Insert Error:", error);
//                 console.error("Full Error Object:", JSON.stringify(error, null, 2));
//                 toast({
//                     title: "Database Error",
//                     description: "Failed to save website. Try again",
//                     variant: "destructive",
//                 });
//                 setIsLoading(false);
//                 return;
//             }

//             console.log("Supabase Insert Success:", { data });
//             setIsLoading(false);
//             router.push("/confirm-info");
//         } catch (error) {
//             console.error("Client-Side Error:", error);
//             toast({
//                 title: "Client-Side Error",
//                 description: "An unexpected error occurred.",
//                 variant: "destructive",
//             });
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Layout>
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Website</h1>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Enter Your Website URL</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="space-y-2">
//                                 <Input
//                                     id="website-link"
//                                     type="text"
//                                     placeholder="https://example.com"
//                                     value={websiteLink}
//                                     onChange={(e) => setWebsiteLink(e.target.value)}
//                                     className="w-full"
//                                     required
//                                 />
//                             </div>
//                             <Button
//                                 type="submit"
//                                 className="w-full bg-blue-500 hover:bg-blue-600 text-white"
//                                 disabled={isLoading || !isSupabaseInitialized}
//                             >
//                                 {isLoading ? "Connecting..." : "Connect Website"}
//                             </Button>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </Layout>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client

export default function InputWebsitePage() {
    const [websiteLink, setWebsiteLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const [isSupabaseInitialized, setIsSupabaseInitialized] = useState(false);

    useEffect(() => {
        console.log("Component Rendered");
        setIsSupabaseInitialized(true); // Assuming supabaseClient is already initialized in lib/supabaseClient
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
        setIsLoading(true);

        console.log("Submitting URL:", websiteLink);

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!urlPattern.test(websiteLink)) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid website link",
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }

        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session?.user?.id) {
                toast({
                    title: "Authentication Error",
                    description: "You must be logged in to connect a website.",
                    variant: "destructive",
                });
                setIsLoading(false);
                return;
            }

            const currentUserId = session.user.id;

            const { data, error } = await supabase
                .from("websites")
                .insert([{ url: websiteLink, user_id: currentUserId }]);

            if (error) {
                console.error("Supabase Insert Error:", error);
                console.error("Full Error Object:", JSON.stringify(error, null, 2));
                toast({
                    title: "Database Error",
                    description: "Failed to save website. Try again",
                    variant: "destructive",
                });
                setIsLoading(false);
                return;
            }

            console.log("Website inserted successfully:", data);
            toast({
                title: "Website Connected",
                description: "The website was successfully connected",
            });
            setIsLoading(false);
            router.push("/confirm-info");
        } catch (error) {
            console.error("Client-Side Error:", error);
            toast({
                title: "Client-Side Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Connect Your Website</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Enter Your Website URL</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    id="website-link"
                                    type="text"
                                    placeholder="https://example.com"
                                    value={websiteLink}
                                    onChange={(e) => setWebsiteLink(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                disabled={isLoading || !isSupabaseInitialized}
                            >
                                {isLoading ? "Connecting..." : "Connect Website"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </Layout>
    );
}