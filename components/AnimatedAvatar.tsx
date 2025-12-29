"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AnimatedAvatar() {
  return (
    <motion.div
      className="relative w-10 h-10 rounded-full overflow-hidden"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Image
        src="/placeholder.svg?text=TC"
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full bg-blue-500 text-white"
      />
    </motion.div>
  )
}

