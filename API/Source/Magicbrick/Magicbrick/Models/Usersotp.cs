using System;
using System.Collections.Generic;

namespace Magicbrick.Models
{
    public partial class Usersotp
    {
        public int Id { get; set; }
        public int? Uid { get; set; }
        public int Otp { get; set; }

        public virtual User? UidNavigation { get; set; }
    }
}
