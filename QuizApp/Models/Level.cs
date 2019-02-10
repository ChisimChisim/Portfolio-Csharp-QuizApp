using System;
using System.Collections.Generic;

namespace QuizApp.Models
{
    public partial class Level
    {
        public Level()
        {
            Grade = new HashSet<Grade>();
            Question = new HashSet<Question>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Grade> Grade { get; set; }
        public ICollection<Question> Question { get; set; }
    }
}
